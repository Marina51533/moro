import { test, expect } from '../../../src/fixtures/test-fixtures';
import { TasksClient } from '../../../src/api/tasks.client';
import type { TaskResponse } from '../helpers/task-response';

test.describe('[positive] API: Tasks (Swagger) - GET /tasks/completed', () => {
  test.use({
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:8080'
  });

  test('returns completed tasks and includes newly completed task', async ({ request, apiData }) => {
    const tasksClient = new TasksClient(request);

    const createResponse = await tasksClient.createTask(apiData.createTask);
    expect(createResponse.status()).toBe(200);
    const createdTask = (await createResponse.json()) as TaskResponse;

    const completeResponse = await tasksClient.completeTask(createdTask.id);
    expect(completeResponse.status()).toBe(200);

    const completedResponse = await tasksClient.getCompletedTasks();
    expect(completedResponse.status()).toBe(200);
    const completedTasks = (await completedResponse.json()) as TaskResponse[];

    expect(Array.isArray(completedTasks)).toBeTruthy();
    expect(completedTasks.some((task) => task.id === createdTask.id)).toBeTruthy();
    for (const task of completedTasks) {
      expect(task.completed).toBeTruthy();
    }

    const deleteResponse = await tasksClient.deleteTask(createdTask.id);
    expect(deleteResponse.status()).toBe(200);
  });
});
