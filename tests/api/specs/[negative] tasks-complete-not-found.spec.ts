import { test, expect } from '../../../src/fixtures/test-fixtures';
import { TasksClient } from '../../../src/api/tasks.client';

const skipKnownBeBugs = process.env.API_SKIP_KNOWN_BE_BUGS !== 'false';

test.describe('[negative] API: Tasks (Swagger) - complete not found', () => {
  test.skip(skipKnownBeBugs, 'Known backend bug: endpoint returns 404 instead of Swagger-defined 400 for not-found ID.');

  test.use({
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:8080'
  });

  test('returns expected not-found status for POST /tasks/{id}/complete', async ({ request, apiData }) => {
    const tasksClient = new TasksClient(request);

    const response = await tasksClient.completeTask(apiData.notFoundTaskId);
    expect(response.status()).toBe(400);

    const body = await response.text();
    expect(typeof body).toBe('string');
  });
});
