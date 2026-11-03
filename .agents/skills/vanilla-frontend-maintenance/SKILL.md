---
name: vanilla-frontend-maintenance
description: Make scoped, maintainable changes to the current MNI OS HTML, CSS, and JavaScript application.
---

# Vanilla frontend maintenance

Use for implementation work in the current Gudang & Logistik website.

## Workflow

1. Read `apps/gudang-logistik/docs/DEVELOPMENT.md`, inspect relevant source files and the current git diff.
2. Match the change to approved user requirements and acceptance criteria. If behavior is unclear, prepare a product brief before changing it.
3. Keep structure, styling, and behavior in the existing HTML/CSS/JS organization. Prefer narrow changes and reuse existing patterns.
4. Avoid new libraries/build systems and broad rewrites until an architecture decision records the need and migration path.
5. Keep sample and preview data synthetic. Avoid putting secrets or real operational rows in fixtures, logs, or screenshots.
6. Describe changed files, expected behavior, and what remains unverified in the project progress note when the change is material.

## Guardrails

- Do not claim backend, database, authentication, multi-user, or cloud behavior from a static preview.
- Do not change operational data or external services as part of UI work.
- Do not stage personal `.obsidian/` preferences.
- A successful source edit does not prove a browser journey; record verification separately.
