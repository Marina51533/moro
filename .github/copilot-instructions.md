# RTFM

Prefer reading existing code before adding new code.

Follow the existing patterns in this repo (fixtures + page objects + Playwright Test).

Read and follow the detailed guides:
- `.github/instructions/e2e-tests.md`
- `.github/instructions/api-tests.md`

## Project Overview

- Tech: Playwright Test + TypeScript.
- Test suites:
  - UI E2E: `tests/ui/**`
  - API tests: `tests/api/**`

## Reporting

- Playwright HTML: `playwright-report/` (open via `npm run report`)
- Allure: `allure-results/` → `npm run allure:generate` → `npm run allure:open`

## Directory Structure (this repo)

```text
tests/
  api/
    helpers/
    specs/
      [positive] *.spec.ts
      [negative] *.spec.ts
  ui/
    *.spec.ts

src/
  fixtures/
    test-fixtures.ts
  page-objects/
    *.ts
  data/
    ui-data.json
    api-data.json
```

## Key Files

- Playwright config: `playwright.config.ts`
- E2E fixtures entry: `src/fixtures/test-fixtures.ts`
- Page objects: `src/page-objects/*`
- API helpers: `tests/api/helpers/*`
- Env vars: `.env`

## Environment Variables

### UI
- `MORO_DOMAIN`: base URL for UI navigation (used by page objects).

### API
- `API_BASE_URL`: base URL for API tests.

## Adding Tests

### E2E UI tests
- Add new specs under `tests/ui/` and name them `*.spec.ts`.
- Always use the Page Object Model:
  - Put selectors + UI actions in `src/page-objects/`.
  - Keep test files focused on flows and assertions.
- Use fixtures from `src/fixtures/test-fixtures.ts`:
  - Import `test` from the fixture module.
  - Prefer fixture page objects over direct raw `page` selectors in test code.

### API tests
- Add new specs under `tests/api/specs/` and name them `*.spec.ts`.
- Use `[positive]` / `[negative]` filename prefixes for API test cases.
- Put common logic in `tests/api/helpers/` and shared constants in `src/data/api-data.json`.

## Running Tests

- All tests: `npm test`
- UI only: `npm run test:ui`
- API only: `npm run test:api`
- HTML report: `npm run report`

## Linting

- Lint: `npm run lint`
- Fix: `npm run lint:fix`

## Conventions / Guardrails

- Don’t use `page.waitForTimeout()` in tests; wait on locators/conditions instead.
- Use `expect(...)` assertions in every test.
- Avoid direct selectors in test specs; keep them inside page objects.
- When renaming files referenced by imports, update all imports across the repo.
