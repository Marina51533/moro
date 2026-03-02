# API Testing Guide

## Purpose

Define conventions for API tests with Playwright Test + TypeScript.

## Scope

- API specs: `tests/api/specs/*.spec.ts`
- API helpers/clients: `tests/api/helpers/*`
- API test data/constants: `src/data/api-data.json`

## Repository Convention

- Keep API spec files under `tests/api/specs/`.
- Use filename prefixes `[positive]` and `[negative]`.

## Core Rules

- Keep reusable request logic in helper/client modules.
- Keep specs focused on scenario flow and assertions.
- Validate both status codes and response body contracts.
- Externalize reusable payloads and constants.

## Typical CRUD Flow

1. GET list and validate shape/status.
2. POST create and validate returned entity.
3. PUT/PATCH update and validate changed data.
4. DELETE and validate removal/response code.

## Data & Auth

- Read auth config from environment variables (for example `AUTH_HEADER`).
- Avoid hardcoding secrets and credentials in specs.

## Naming

- Spec files must use `*.spec.ts`.
- Test names should include endpoint behavior and expected result.
