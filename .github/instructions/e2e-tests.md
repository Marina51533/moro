# E2E Testing Guide

## Purpose

Define conventions for UI E2E tests with Playwright Test + TypeScript.

## Scope

- Test specs: `tests/ui/*.spec.ts`
- Fixtures: `src/fixtures/test-fixtures.ts`
- Page Objects: `src/page-objects/*`
- Shared UI test data: `src/data/ui-data.json`

## Core Rules

- Keep all selectors in page objects.
- Keep test files focused on user flows and assertions only.
- Reuse fixture-provided page objects.
- Do not use `page.waitForTimeout()`.
- Use explicit assertions with `expect(...)`.

## Typical Test Structure

1. Arrange via fixture/page object methods.
2. Act via page object actions.
3. Assert expected UI behavior.

## Naming

- Spec files must use `*.spec.ts`.
- Test names should describe behavior and expected outcome.

## Stability

- Prefer robust locator strategies in page objects.
- Wait on visible/attached/enabled states and URL/content conditions.
- Avoid brittle, timing-only waits.
