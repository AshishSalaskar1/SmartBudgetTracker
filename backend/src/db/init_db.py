from pathlib import Path

from db.connection import get_connection


def init_db() -> None:
    conn = get_connection()
    schema_path = Path(__file__).resolve().parent / "schema.sql"
    schema_sql = schema_path.read_text(encoding="utf-8")
    conn.execute(schema_sql)

    _ensure_transactions_columns(conn)


def _ensure_transactions_columns(conn) -> None:
    columns = {
        row[1]: row[2]
        for row in conn.execute("PRAGMA table_info('transactions')").fetchall()
    }

    if "category" not in columns:
        conn.execute("ALTER TABLE transactions ADD COLUMN category TEXT")
    if "reason" not in columns:
        conn.execute("ALTER TABLE transactions ADD COLUMN reason TEXT")
