import json
import logging
from datetime import date
from io import StringIO
from typing import List

import pandas as pd

from openai import AzureOpenAI

from config import settings

API_VERSION = "2024-12-01-preview"


client = AzureOpenAI(
    api_version=API_VERSION,
    azure_endpoint=settings.azure_ai_endpoint,
    api_key=settings.azure_ai_api_key,
)


TRANSACTION_SCHEMA = {
    "type": "object",
    "properties": {
        "transactions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "date": {"type": "string", "description": "ISO date YYYY-MM-DD"},
                    "description": {"type": "string"},
                    "category": {"type": "string"},
                    "reason": {"type": "string"},
                    "amount": {"type": "number"},
                    "direction": {"type": "string", "enum": ["credit", "debit"]},
                },
                "required": ["date", "description", "category", "reason", "amount", "direction"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["transactions"],
    "additionalProperties": False,
}


def extract_transactions(text: str, month: int, year: int) -> List[dict]:
    logging.info("Statement text length: %s", len(text))
    system_prompt = (
        "You extract bank statement transactions into structured JSON. "
        "Return only valid JSON matching the schema. Do not invent data."
    )
    user_prompt = (
        f"Extract all transactions for statement month {month}/{year}. "
        "Return JSON with fields: date (YYYY-MM-DD), description, category, reason, amount (positive number), "
        "direction (credit or debit). Use best-effort extraction: if a row is unclear, omit it; "
        "if there are no transactions at all, return an empty array. Do not invent data. "
        "Category must be one of: Groceries, Credit Cards, Travel, Other UPI Expenses, Shopping, UPI Uncategorized, Investments. "
        "Reason is a short phrase inferred from the description.\n\n"
        "Statement text:\n"
        f"{text}"
    )

    try:
        response = client.chat.completions.create(
            model=settings.azure_ai_deployment,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            response_format={"type": "json_schema", "json_schema": {"name": "transactions", "schema": TRANSACTION_SCHEMA}},
            temperature=0.2,
            max_completion_tokens=4000,
        )
    except Exception as exc:
        logging.exception("Azure OpenAI extraction failed")
        raise ValueError(f"Azure OpenAI extraction error: {exc}") from exc

    content = response.choices[0].message.content
    try:
        payload = json.loads(content or "{}")
    except Exception as exc:
        logging.exception("Failed to parse AI response JSON")
        raise ValueError(f"Invalid AI response JSON: {exc}") from exc
    transactions = payload.get("transactions", [])

    if not transactions:
        fallback = _try_parse_csv_like(text)
        if fallback:
            return fallback
        raise ValueError("AI extraction returned no transactions")

    validated = []
    for txn in transactions:
        try:
            date.fromisoformat(txn["date"])
        except Exception as exc:
            raise ValueError("Invalid transaction date") from exc

        if not txn["description"] or not txn["category"] or not txn["reason"] or float(txn["amount"]) <= 0:
            raise ValueError("Invalid transaction data")
        if txn["direction"] not in {"credit", "debit"}:
            raise ValueError("Invalid transaction direction")
        validated.append(txn)

    return validated


def _try_parse_csv_like(text: str) -> List[dict]:
    if "," not in text:
        return []

    try:
        df = pd.read_csv(StringIO(text))
    except Exception as exc:
        logging.info("CSV-like parse failed: %s", exc)
        return []

    columns = {col.lower().strip(): col for col in df.columns}
    date_col = _first_match(columns, ["date", "transaction date", "posted date"])
    desc_col = _first_match(columns, ["description", "details", "narration", "merchant"])
    amount_col = _first_match(columns, ["amount", "amt", "value"])
    debit_col = _first_match(columns, ["debit"])
    credit_col = _first_match(columns, ["credit"])

    if not date_col or not desc_col or (not amount_col and not (debit_col or credit_col)):
        return []

    transactions: List[dict] = []
    for _, row in df.iterrows():
        raw_date = str(row[date_col]).strip()
        raw_desc = str(row[desc_col]).strip()
        if not raw_date or not raw_desc:
            continue

        amount = None
        direction = None
        if amount_col:
            try:
                amount = float(row[amount_col])
                direction = "debit" if amount < 0 else "credit"
                amount = abs(amount)
            except Exception:
                continue
        else:
            try:
                if debit_col and not pd.isna(row[debit_col]):
                    amount = float(row[debit_col])
                    direction = "debit"
                elif credit_col and not pd.isna(row[credit_col]):
                    amount = float(row[credit_col])
                    direction = "credit"
            except Exception:
                continue

        if amount is None or not direction:
            continue

        transactions.append(
            {
                "date": raw_date,
                "description": raw_desc,
                "category": "UPI Uncategorized",
                "reason": raw_desc[:60],
                "amount": amount,
                "direction": direction,
            }
        )

    logging.info("CSV-like fallback extracted %s transactions", len(transactions))
    return transactions


def _first_match(columns: dict, candidates: List[str]) -> str | None:
    for candidate in candidates:
        if candidate in columns:
            return columns[candidate]
    return None
