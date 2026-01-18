import uuid
from typing import Iterable

from db.connection import get_connection


def get_statement_by_month_year(user_id: str, month: int, year: int):
    conn = get_connection()
    return conn.execute(
        "SELECT id, status FROM bank_statements WHERE user_id = ? AND month = ? AND year = ?",
        [user_id, month, year],
    ).fetchone()


def delete_statement(statement_id: str) -> None:
    conn = get_connection()
    conn.execute("DELETE FROM transactions WHERE statement_id = ?", [statement_id])
    conn.execute("DELETE FROM bank_statements WHERE id = ?", [statement_id])


def create_statement(user_id: str, month: int, year: int, filename: str) -> str:
    conn = get_connection()
    statement_id = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO bank_statements (id, user_id, month, year, original_filename, status) VALUES (?, ?, ?, ?, ?, ?)",
        [statement_id, user_id, month, year, filename, "processing"],
    )
    return statement_id


def update_statement_status(statement_id: str, status: str, error_message: str | None = None) -> None:
    conn = get_connection()
    conn.execute(
        "UPDATE bank_statements SET status = ?, error_message = ? WHERE id = ?",
        [status, error_message, statement_id],
    )


def insert_transactions(statement_id: str, transactions: Iterable[dict]) -> None:
    conn = get_connection()
    for txn in transactions:
        conn.execute(
            "INSERT INTO transactions (id, statement_id, date, description, category, reason, amount, direction) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                str(uuid.uuid4()),
                statement_id,
                txn["date"],
                txn["description"],
                txn["category"],
                txn["reason"],
                float(txn["amount"]),
                txn["direction"],
            ],
        )
