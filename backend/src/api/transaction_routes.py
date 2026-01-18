from fastapi import APIRouter, Depends, Query

from api.deps import get_current_user
from services.transaction_service import get_transactions, get_yearly_transactions

router = APIRouter()


@router.get("")
def list_transactions(
	month: int = Query(..., ge=1, le=12),
	year: int = Query(..., ge=2000, le=2100),
	current_user: dict = Depends(get_current_user),
):
	return get_transactions(current_user["id"], month, year)


@router.get("/yearly")
def list_yearly_transactions(
	year: int = Query(..., ge=2000, le=2100),
	limit: int = Query(25, ge=5, le=200),
	offset: int = Query(0, ge=0),
	current_user: dict = Depends(get_current_user),
):
	return get_yearly_transactions(current_user["id"], year, limit, offset)
