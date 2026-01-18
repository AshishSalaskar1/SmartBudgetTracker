from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class AuthUser(BaseModel):
    id: str
    username: str
    role: str


class Statement(BaseModel):
    id: str
    month: int
    year: int
    status: str
    uploaded_at: datetime


class Transaction(BaseModel):
    id: str
    date: date
    description: str
    category: str
    reason: str
    amount: float
    direction: str


class StatementSummary(BaseModel):
    month: int
    year: int
    total_income: float
    total_expense: float
    total_investments: float
    net: float
    transaction_count: int
    top_merchants: List[dict]
    daily_spend: List[dict]


class StatementSummaryResponse(BaseModel):
    summary: StatementSummary
    transactions: Optional[List[Transaction]] = None
