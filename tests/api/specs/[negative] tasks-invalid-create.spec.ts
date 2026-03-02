import { test, expect } from '../../../src/fixtures/test-fixtures';
import { TasksClient } from '../../../src/api/tasks.client';

test.describe('[negative] API: Tasks (Swagger) - invalid create', () => {
  test.use({
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:8080'
  });

  test('returns 422 for POST /tasks with invalid payload', async ({ request, apiData }) => {
    const tasksClient = new TasksClient(request);

    const response = await tasksClient.createTask(apiData.invalidTask);
    expect(response.status()).toBe(422);
    const body = await response.text();
    expect(typeof body).toBe('string');
  });
});
