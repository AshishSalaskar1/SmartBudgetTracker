from fastapi import APIRouter

from api.health import router as health_router
from api.auth_routes import router as auth_router
from api.statement_routes import router as statement_router
from api.summary_routes import router as summary_router
from api.transaction_routes import router as transaction_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(statement_router, prefix="/statements", tags=["statements"])
api_router.include_router(summary_router, prefix="/summary", tags=["summary"])
api_router.include_router(transaction_router, prefix="/transactions", tags=["transactions"])
