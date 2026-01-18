# Backend (FastAPI)

## Prerequisites
- Python 3.11+

## Setup
1. Create a virtual environment and activate it.
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Create a `.env` file (copy from `.env.example`) and fill in values:
   - `AZURE_AI_ENDPOINT`
   - `AZURE_AI_API_KEY`
   - `AZURE_AI_DEPLOYMENT`
   - `DB_PATH`
   - `APP_ADMIN_USERNAME` / `APP_ADMIN_PASSWORD`
   - `APP_USER_USERNAME` / `APP_USER_PASSWORD`
   - `SESSION_SECRET`

## Run
- Start the API:
   - `uv run src/app.py`

## Notes
- CORS is enabled for all origins in dev.
- Auth uses a simple bearer token returned from `/api/auth/login`.
- If a statement already exists, upload without `replace=true` returns `409`.
