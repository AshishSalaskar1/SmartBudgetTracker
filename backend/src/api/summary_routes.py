from fastapi import APIRouter, Depends, Query

from api.deps import get_current_user
from services.summary_service import get_monthly_summary, get_yearly_summary

router = APIRouter()


@router.get("")
def summary(
	month: int = Query(..., ge=1, le=12),
	year: int = Query(..., ge=2000, le=2100),
	current_user: dict = Depends(get_current_user),
):
	return get_monthly_summary(current_user["id"], month, year)


@router.get("/yearly")
def yearly_summary(
	year: int = Query(..., ge=2000, le=2100),
	current_user: dict = Depends(get_current_user),
):
	return get_yearly_summary(current_user["id"], year)
