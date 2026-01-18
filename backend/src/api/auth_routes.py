from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from db.connection import get_connection
from db.seed import seed_users
from models.schemas import LoginRequest
from services.auth import clear_session, create_session, verify_password
from api.deps import get_current_user

router = APIRouter()
security = HTTPBearer()


def _get_user_by_username(username: str):
    conn = get_connection()
    return conn.execute(
        "SELECT id, username, password_hash, salt, role FROM users WHERE username = ?",
        [username],
    ).fetchone()


@router.post("/login")
def login(payload: LoginRequest):
    seed_users()
    row = _get_user_by_username(payload.username)
    if not row:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    user_id, username, password_hash, salt, role = row
    if not verify_password(payload.password, salt, password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_session(user_id)
    return {"id": user_id, "username": username, "role": role, "token": token}


@router.post("/logout")
def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    clear_session(credentials.credentials)
    return {"status": "ok"}


@router.get("/me")
def me(current_user: dict = Depends(get_current_user)):
    return current_user
