# Implementation Plan: Personal Budget Tracker

**Branch**: `001-budget-tracker` | **Date**: 2026-01-18 | **Spec**: [specs/001-budget-tracker/spec.md](specs/001-budget-tracker/spec.md)
**Input**: Feature specification from `/specs/001-budget-tracker/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a local-first personal budget tracker with a Vite + React frontend and a FastAPI backend. Users (2 local accounts) authenticate, upload monthly statements (PDF/CSV/XLSX), and the backend uses Azure AI Foundry-compatible models to extract transactions (date, description, amount, credit/debit), storing results in DuckDB. The UI provides a dashboard and month/year views with stats and charts, plus replace/keep behavior for existing months.

Initial backend configuration will enable CORS for all origins to simplify local UI development.

## Technical Context

**Language/Version**: Python 3.11, TypeScript 5.x (Vite + React)  
**Primary Dependencies**: FastAPI, Uvicorn, DuckDB, Pydantic, openai (AzureOpenAI), React, Vite, Recharts (or similar)  
**Storage**: DuckDB (local file)  
**Testing**: Manual verification (no automated tests required)  
**Target Platform**: Localhost on Linux  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: Statement upload + extraction under 2 minutes  
**Constraints**: Local-first; Azure AI Foundry required for extraction; dark-mode primary UI  
**Scale/Scope**: 2 local users, single-machine usage

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Local-First Development: PASS (localhost app; external Azure AI dependency is required by feature)
- Pragmatic Quality: PASS (manual verification; concise docs)
- Clear Communication: PASS (spec.md + plan.md)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
├── src/
│   ├── api/
│   ├── models/
│   ├── services/
│   └── db/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── theme/
└── tests/
```

**Structure Decision**: Web application with separate `backend/` and `frontend/` for FastAPI and Vite + React.

## Phase 0 Research Summary

See [specs/001-budget-tracker/research.md](specs/001-budget-tracker/research.md) for decisions on Azure AI Foundry SDKs, DuckDB usage, and local dev integration.

## Post-Design Constitution Check

- Local-First Development: PASS
- Pragmatic Quality: PASS
- Clear Communication: PASS

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
