from dataclasses import dataclass
from datetime import date, datetime


@dataclass
class Transaction:
    id: str
    statement_id: str
    date: date
    description: str
    category: str
    reason: str
    amount: float
    direction: str
    created_at: datetime
