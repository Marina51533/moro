import { test, expect } from '../../../src/fixtures/test-fixtures';
import { TasksClient } from '../../../src/api/tasks.client';
import type { TaskResponse } from '../helpers/task-response';

test.describe('[positive] API: Tasks (Swagger) - GET /tasks', () => {
  test.use({
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:8080'
  });

  test('returns list and valid schema', async ({ request }) => {
    const tasksClient = new TasksClient(request);

    const response = await tasksClient.getAllTasks();
    expect(response.status()).toBe(200);

    const tasks = (await response.json()) as TaskResponse[];
    expect(Array.isArray(tasks)).toBeTruthy();

    for (const task of tasks) {
      expect(typeof task.id).toBe('string');
      expect(typeof task.text).toBe('string');
      expect(typeof task.completed).toBe('boolean');
      expect(typeof task.createdDate).toBe('number');
    }
  });
});
