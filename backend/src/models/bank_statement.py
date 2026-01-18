from dataclasses import dataclass
from datetime import datetime


@dataclass
class BankStatement:
    id: str
    user_id: str
    month: int
    year: int
    original_filename: str
    status: str
    uploaded_at: datetime
    error_message: str | None = None
