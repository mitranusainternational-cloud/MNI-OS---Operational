---
name: playwright-e2e
description: Define and run safe, scoped end-to-end browser scenarios for MNI OS using the supported Playwright interface.
---

# Playwright E2E

Use when the user requests browser verification, or when an approved implementation task includes browser acceptance checks.

## Workflow

1. Read the feature acceptance criteria and app development guide.
2. Confirm a supported browser/Playwright surface and identify environment, version, route, role, and data class.
3. If the supported surface is unavailable, stop and report the blocker. Do not access browser profiles, cookies, tokens, CDP, hidden APIs, or session storage.
4. Prefer disposable synthetic records in local/development. Do not submit real transactions or mutate production records.
5. Inspect visible UI/DOM and current state; select locators grounded in observed semantics. Avoid brittle timing and selectors.
6. Cover the requested happy path and relevant validation/permission/exception paths. Capture screenshot/trace only when useful and free of sensitive data.
7. Report each criterion as passed, failed, blocked, or not covered. State whether evidence proves UI behavior, API behavior, or database persistence; these are separate claims.
8. Index approved artifacts in `documentation/screenshots/README.md` with date, branch/commit, route, scenario, and environment.

## Guardrails

- A test plan is not a test run; do not report unexecuted checks as passed.
- Do not bypass a disabled browser surface with another access method.
- Do not store credentials, personal data, or transaction exports in the vault or Git.
