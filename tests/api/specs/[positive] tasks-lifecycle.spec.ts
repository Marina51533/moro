import { test, expect } from '../../../src/fixtures/test-fixtures';
import { TasksClient } from '../../../src/api/tasks.client';
import type { TaskResponse } from '../helpers/task-response';

test.describe('[positive] API: Tasks (Swagger) - lifecycle', () => {
  test.use({
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:8080'
  });

  test('creates, updates, completes, incompletes and deletes a task', async ({ request, apiData }) => {
    const tasksClient = new TasksClient(request);
    let createdTask: TaskResponse;

    await test.step('Create task', async () => {
      const createResponse = await tasksClient.createTask(apiData.createTask);
      expect(createResponse.status()).toBe(200);
      createdTask = (await createResponse.json()) as TaskResponse;
      expect(createdTask.text).toBe(apiData.createTask.text);
      expect(createdTask.completed).toBeFalsy();
    });

    await test.step('Update task text', async () => {
      const updateResponse = await tasksClient.updateTask(createdTask.id, apiData.updateTask);
      expect(updateResponse.status()).toBe(200);
      const updatedTask = (await updateResponse.json()) as TaskResponse;
      expect(updatedTask.text).toBe(apiData.updateTask.text);
    });

    await test.step('Complete task', async () => {
      const completeResponse = await tasksClient.completeTask(createdTask.id);
      expect(completeResponse.status()).toBe(200);
      const completedTask = (await completeResponse.json()) as TaskResponse;
      expect(completedTask.completed).toBeTruthy();
      expect(typeof completedTask.completedDate).toBe('number');
    });

    await test.step('Verify task in completed list', async () => {
      const completedListResponse = await tasksClient.getCompletedTasks();
      expect(completedListResponse.status()).toBe(200);
      const completedList = (await completedListResponse.json()) as TaskResponse[];
      expect(completedList.some((task) => task.id === createdTask.id)).toBeTruthy();
    });

    await test.step('Mark task as incomplete', async () => {
      const incompleteResponse = await tasksClient.incompleteTask(createdTask.id);
      expect(incompleteResponse.status()).toBe(200);
      const incompletedTask = (await incompleteResponse.json()) as TaskResponse;
      expect(incompletedTask.completed).toBeFalsy();
    });

    await test.step('Delete task', async () => {
      const deleteResponse = await tasksClient.deleteTask(createdTask.id);
      expect(deleteResponse.status()).toBe(200);
    });
  });
});
