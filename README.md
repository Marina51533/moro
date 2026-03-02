# Playwright + TypeScript Test Framework (GUI + API)

Automation framework created from scratch for:
- GUI testing of MoroSystems career flow
- API testing of tasks CRUD on backend app

## Tech Stack
- Playwright
- TypeScript
- Page Object Model
- Custom Fixtures
- JSON-based test data

## Framework Principles
- All locators are inside Page Objects only
- No hardcoded business test data inside Page Objects
- Reusable fixtures for page objects and test data
- Parallel and cross-browser execution
- Reporting + screenshots/videos/traces on failure

## Project Structure
```text
.
├── .github/workflows/playwright.yml
├── playwright.config.ts
├── src
│   ├── api
│   │   ├── tasks.client.ts
│   │   └── generated/
│   │       └── todo/
│   ├── data
│   │   ├── api-data.json
│   │   └── ui-data.json
│   ├── fixtures
│   │   └── test-fixtures.ts
│   ├── page-objects
│   │   └── moro-career.page.ts
│   └── types
│       └── test-data.ts
├── tests
│   ├── api
│   │   ├── helpers/
│   │   └── specs/
│   │       ├── [positive] tasks-get.spec.ts
│   │       ├── [positive] tasks-completed.spec.ts
│   │       ├── [positive] tasks-lifecycle.spec.ts
│   │       ├── [negative] tasks-invalid-create.spec.ts
│   │       ├── [negative] tasks-delete-not-found.spec.ts
│   │       ├── [negative] tasks-complete-not-found.spec.ts
│   │       └── [negative] tasks-incomplete-not-found.spec.ts
│   └── ui
│       └── moro-flow.spec.ts
└── .env.example
```

## Setup

### 1) Install dependencies
```bash
npm install
npx playwright install
```

### 2) Configure environment
```bash
cp .env.example .env
```

Default values in `.env.example`:
- `API_BASE_URL=http://localhost:8080`
- `MORO_DOMAIN=https://www.morosystems.cz`

Optional API mode flags:
- `API_CONTRACT_MODE=true` enables strict Swagger status validation.
- `API_SKIP_KNOWN_BE_BUGS=true` skips tests marked as known backend bugs (default behavior).
- Set `API_SKIP_KNOWN_BE_BUGS=false` to run those tests anyway.

## Run Backend for API Tests

Use backend from:
- https://github.com/morosystems/todo-be

Start it locally according to its README and ensure it is reachable at `API_BASE_URL`.

## Run Tests

All tests:
```bash
npm test
```

Only GUI tests:
```bash
npm run test:ui
```

Only API tests:
```bash
npm run test:api
```

Generate OpenAPI client:
```bash
npm run api:codegen
```

Debug mode:
```bash
npm run test:debug
```

Lint:
```bash
npm run lint
npm run lint:fix
```

## Test Coverage (Assignment Mapping)

### GUI
- Open MoroSystems `Kariéra` page
- Filter positions by city and validate filtered content

### API
- GET tasks list
- POST create task
- POST update task text (`/tasks/{id}`)
- POST complete/incomplete (`/tasks/{id}/complete`, `/tasks/{id}/incomplete`)
- DELETE task
- Validate status codes and response data (including `400`/`422` negative cases)

## Enhancements Included
- Cross-browser testing (`chromium`, `firefox`, `webkit`)
- Responsive check (desktop + mobile viewport)
- Parallel execution
- HTML + JSON reports
- Screenshots, traces, and video on failures
- CI workflow with GitHub Actions

## Reporting
<img width="1425" height="660" alt="Screenshot 2026-03-02 at 19 51 13" src="https://github.com/user-attachments/assets/71986403-3eaf-4079-a31c-262dd9ad793b" />
Open HTML report:
```bash
npm run report
```

JSON report output:
- `test-results/results.json`

Allure report:
```bash
npm run allure:generate
npm run allure:open
```

Allure raw results:
- `allure-results/`

Allure HTML report output:
- `allure-report/`

Allure workflow:
1. Run tests to generate `allure-results/`.
2. Generate report with `npm run allure:generate`.
3. Open report with `npm run allure:open`.

Note:
- `allure:open` starts a local web server for the generated report.

Troubleshooting Allure:
- If `allure-results/` is empty, run tests first: `npm test` (or `npm run test:api` / `npm run test:ui`).
- If generation fails, regenerate from scratch: `npm run allure:generate`.
- If report looks outdated, rerun tests and then regenerate report.

## CI/CD pipeline and GitHub actions
- Run on each pr
- Run API and e2e tests
  
<img width="1440" height="531" alt="Screenshot 2026-03-02 at 22 19 10" src="https://github.com/user-attachments/assets/edaaf9f1-f410-403a-b576-d70386f8079f" />


## Notes
- API tests expect `/tasks` endpoints from the MoroSystems Todo backend.
- OpenAPI client code is generated to `src/api/generated/todo/` from `http://localhost:8080/v3/api-docs`.


  
