from io import BytesIO
from typing import Tuple

import pandas as pd
import pdfplumber


def _normalize_extension(filename: str) -> str:
    return filename.lower().rsplit(".", 1)[-1] if "." in filename else ""


def extract_text_from_statement(file_bytes: bytes, filename: str) -> Tuple[str, str]:
    ext = _normalize_extension(filename)

    if ext == "csv":
        df = pd.read_csv(BytesIO(file_bytes))
        return df.to_csv(index=False), "csv"

    if ext in {"xlsx", "xls"}:
        df = pd.read_excel(BytesIO(file_bytes))
        return df.to_csv(index=False), "xlsx"

    if ext == "pdf":
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        if not text.strip():
            raise ValueError("PDF text extraction failed; scanned PDFs not supported yet")
        return text, "pdf"

    raise ValueError("Unsupported file format")
