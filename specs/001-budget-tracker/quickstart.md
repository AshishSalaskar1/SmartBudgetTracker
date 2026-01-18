# Quickstart

## Prerequisites
- Python 3.11+
- Node.js 20+
- Azure AI Foundry credentials (Azure OpenAI endpoint + API key)

## Backend (FastAPI)
1. Create and activate a virtual environment.
2. Install dependencies (FastAPI, Uvicorn, DuckDB, openai, pandas, pdfplumber, etc.).
3. Set environment variables:
   - `AZURE_AI_ENDPOINT`
   - `AZURE_AI_API_KEY`
   - `AZURE_AI_DEPLOYMENT` (Foundry model deployment name)
   - `DB_PATH` (e.g., `/home/ashish/.smartbudget/duckdb.db`)
   - `APP_ADMIN_USERNAME` / `APP_ADMIN_PASSWORD`
   - `APP_USER_USERNAME` / `APP_USER_PASSWORD`
4. Run the API server on `http://localhost:8000`.

## Frontend (Vite + React)
1. Install dependencies.
2. Set `VITE_API_BASE=/api` for local proxy usage.
3. Run the dev server on `http://localhost:5173`.

## Local Dev Notes
- Vite proxies `/api/*` to the FastAPI backend.
- Enable CORS in FastAPI; for now allow all origins to simplify local UI development.
- If a statement already exists for the selected month/year, the API returns `409` unless `replace=true` is provided.
- If AI extraction is partial/ambiguous, the upload fails and no data is saved.
- Auth is a simple bearer token returned from `/api/auth/login`; store it in local storage as `auth_token`.
