<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 1.1.0
Rationale: Expand principles to explicitly support lightweight specs and allow technical detail for MVP speed.

Modified Principles:
- Pragmatic Quality (expanded to relax spec rigor and acceptance criteria)
- Clear Communication (expanded to allow technical detail in specs and lightweight user stories)

Added Sections:
- None

Removed Sections:
- None

Templates Requiring Updates:
- ✅ spec-template.md (updated to reflect lightweight specs)
- ⚠️ plan-template.md (no change required)
- ⚠️ tasks-template.md (no change required)
- ⚠️ checklist-template.md (no change required)

Follow-up TODOs:
- None
-->

# SmartBudgetTracker Constitution

## Core Principles

### I. Local-First Development

**MUST** optimize for local development and personal use. Every feature must be runnable entirely on localhost without external dependencies unless explicitly required by the feature itself (e.g., third-party APIs). Configuration must support local environment by default.

**Rationale**: This is a personal-use application running locally. Overhead for deployment, multi-environment configs, and production-grade infrastructure is unnecessary and slows down development.

### II. Pragmatic Quality

**MUST** ensure code is technically sound and maintainable. Testing and documentation are OPTIONAL unless they directly serve understanding or debugging. Focus on:
- Clear, self-documenting code structure
- Inline comments for non-obvious logic only
- README/quickstart for setup and running
- Tests only when complexity warrants them or when they save time

**SHOULD NOT** create tests or documentation for bureaucracy's sake. User stories and acceptance criteria can be minimal or omitted for early MVP work unless they materially improve implementation clarity.

**Rationale**: For a personal project, over-testing and over-documenting creates friction without value. Code quality matters; process theater does not.

### III. Clear Communication

**MUST** maintain specification and implementation plan documents that clearly explain WHAT is being built and WHY. Each feature must have:
- A spec.md explaining the feature's purpose and intended behavior (user stories optional and lightweight)
- A plan.md outlining technical approach and structure decisions
- Only the minimal detail needed to execute implementation, including technical details when they speed development

**SHOULD** keep documents concise and action-oriented. Avoid fluff, theoretical content, or verbose explanations.

**Rationale**: Even for personal projects, clear thinking captured in writing prevents wasted effort and makes context-switching easier. But verbosity wastes time.

## Development Workflow

**Architecture**: Frontend + Backend structure. Backend handles business logic and data, frontend provides UI.

**Feature Process**:
1. Create feature spec (spec.md) - purpose, basic behaviors, and optional lightweight user scenarios
2. Create implementation plan (plan.md) - technical design
3. Generate task list (tasks.md) - ordered work items
4. Implement tasks incrementally
5. Manual verification (automated tests optional)

**Documentation Scope**:
- Technical architecture decisions (when non-obvious)
- Setup and running instructions (README)
- Feature specifications (what/why)
- Implementation plans (how)
- API contracts between frontend/backend (when formal contract needed)

**What to SKIP**:
- Deployment documentation (local only)
- Extensive user guides (personal use)
- Test coverage reports
- Acceptance test protocols
- CI/CD documentation

## Governance

This constitution defines the development approach for SmartBudgetTracker. It prioritizes speed and simplicity for personal local development.

**Amendments**: Update this document when development approach changes. Use `/speckit.constitution` command to maintain consistency across templates.

**Compliance**: Feature specs and plans should align with these principles. However, pragmatism rules - if a principle doesn't serve the specific feature, document the exception and move on.

**Version Control**: Use semantic versioning:
- MAJOR: Fundamental approach changes (e.g., no longer local-first, mandatory testing introduced)
- MINOR: New principles added or existing ones expanded
- PATCH: Clarifications, wording improvements

**Version**: 1.1.0 | **Ratified**: 2026-01-18 | **Last Amended**: 2026-01-18
