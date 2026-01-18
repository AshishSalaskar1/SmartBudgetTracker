import os
import threading

import duckdb

from config import settings

_thread_local = threading.local()


def get_connection() -> duckdb.DuckDBPyConnection:
    conn = getattr(_thread_local, "conn", None)
    if conn is None:
        db_path = settings.db_path
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        conn = duckdb.connect(db_path)
        _thread_local.conn = conn
    return conn
