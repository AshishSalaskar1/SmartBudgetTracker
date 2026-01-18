# Research

## Decision: Azure OpenAI SDK (API key) + JSON Schema output
- **Decision**: Use the `openai` Python SDK with `AzureOpenAI` and API key auth for chat completions, enforcing structured output via `response_format` with `json_schema`.
- **Rationale**: Azure OpenAI is recommended in docs, supports Foundry deployments, and keeps auth simple (API key). `json_schema` reduces parsing errors and ensures typed fields for transactions.
- **Alternatives considered**: `azure-ai-inference` (extra setup with `azure-identity`); `azure-ai-projects` (project client) for broader management.

## Decision: Statement parsing before AI extraction
- **Decision**: Pre-extract text for CSV/XLSX/PDF locally and pass the content to the AI model; if PDF text extraction fails, fall back to rendering pages to images and send via multimodal chat.
- **Rationale**: Local parsing minimizes reliance on external OCR services while still using AI for the required extraction. Multimodal fallback improves robustness for scanned PDFs.
- **Alternatives considered**: Azure Document Intelligence (high fidelity OCR but adds another external service).

## Decision: DuckDB connection strategy for FastAPI
- **Decision**: Use a per-process singleton DuckDB connection and run blocking queries in a threadpool for FastAPI endpoints.
- **Rationale**: DuckDB is local and lightweight; a shared connection is sufficient for low concurrency. Keeping queries short avoids lock contention.
- **Alternatives considered**: New connection per request (overhead); SQLAlchemy/duckdb-engine (extra abstraction not needed for MVP).

## Decision: Local dev frontend/backend integration
- **Decision**: Use Vite dev server proxy to route `/api/*` to FastAPI and keep CORS minimal.
- **Rationale**: Simplifies local development and avoids CORS complexity; aligns with local-first scope.
- **Alternatives considered**: Full CORS configuration for all origins or separate API base URL in dev.

## Decision: Password storage
- **Decision**: Store salted PBKDF2 hashes in DuckDB, with credentials seeded from environment variables on first run.
- **Rationale**: Avoids hardcoding while keeping security basic and local; PBKDF2 is available in standard library.
- **Alternatives considered**: Bcrypt via `passlib` (extra dependency) or plaintext (rejected).
