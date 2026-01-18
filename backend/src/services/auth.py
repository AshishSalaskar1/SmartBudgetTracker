import hashlib
import secrets
from typing import Dict, Optional


def generate_salt() -> str:
    return secrets.token_hex(16)


def hash_password(password: str, salt: str) -> str:
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100_000)
    return dk.hex()


def verify_password(password: str, salt: str, password_hash: str) -> bool:
    return hash_password(password, salt) == password_hash


_session_store: Dict[str, str] = {}


def create_session(user_id: str) -> str:
    token = secrets.token_urlsafe(32)
    _session_store[token] = user_id
    return token


def get_session_user_id(token: str) -> Optional[str]:
    return _session_store.get(token)


def clear_session(token: str) -> None:
    _session_store.pop(token, None)
