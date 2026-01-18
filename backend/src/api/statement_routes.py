import logging

import duckdb
from fastapi import APIRouter, Depends, File, Query, UploadFile

from api.deps import get_current_user
from api.errors import conflict, unprocessable
from services.ai_extraction import extract_transactions
from services.statement_parsers import extract_text_from_statement
from services.statement_service import (
	create_statement,
	delete_statement,
	get_statement_by_month_year,
	insert_transactions,
	update_statement_status,
)
from services.summary_service import get_monthly_summary

router = APIRouter()


@router.post("/upload")
def upload_statement(
	month: int = Query(..., ge=1, le=12),
	year: int = Query(..., ge=2000, le=2100),
	replace: bool = Query(False),
	file: UploadFile = File(...),
	current_user: dict = Depends(get_current_user),
):
	if not file.filename:
		raise unprocessable("Missing file")

	existing = get_statement_by_month_year(current_user["id"], month, year)
	if existing and not replace:
		raise conflict("Statement already exists")
	if existing and replace:
		delete_statement(existing[0])

	file_bytes = file.file.read()
	if not file_bytes:
		raise unprocessable("Empty file")

	try:
		statement_id = create_statement(current_user["id"], month, year, file.filename)
	except duckdb.ConstraintException:
		if replace:
			existing = get_statement_by_month_year(current_user["id"], month, year)
			if existing:
				delete_statement(existing[0])
				statement_id = create_statement(current_user["id"], month, year, file.filename)
			else:
				raise conflict("Statement already exists")
		else:
			raise conflict("Statement already exists")

	try:
		text, _source = extract_text_from_statement(file_bytes, file.filename)
		transactions = extract_transactions(text, month, year)
		insert_transactions(statement_id, transactions)
		update_statement_status(statement_id, "ready")
	except Exception as exc:
		logging.exception("Statement processing failed")
		update_statement_status(statement_id, "failed", str(exc))
		raise unprocessable(str(exc))

	return get_monthly_summary(current_user["id"], month, year)
