import type { APIRequestContext } from '@playwright/test';
import type { CreateTaskPayload, UpdateTaskPayload } from '../types/test-data';
import { ApiError, OpenAPI, TasksService } from './generated/todo';

type ResponsePayload = unknown;

class TasksClientResponse {
  constructor(
    private readonly statusCode: number,
    private readonly payload: ResponsePayload
  ) {}

  status(): number {
    return this.statusCode;
  }

  async json(): Promise<ResponsePayload> {
    return await Promise.resolve(this.payload);
  }

  async text(): Promise<string> {
    if (typeof this.payload === 'string') {
      return await Promise.resolve(this.payload);
    }

    return await Promise.resolve(JSON.stringify(this.payload));
  }
}

export class TasksClient {
  private readonly baseUrl: string;

  constructor(_request: APIRequestContext) {
    void _request;
    this.baseUrl = process.env.API_BASE_URL ?? 'http://localhost:8080';
    OpenAPI.BASE = this.baseUrl;
  }

  private handleApiError(error: unknown): TasksClientResponse {
    if (error instanceof ApiError) {
      return new TasksClientResponse(error.status, error.body);
    }

    throw error;
  }

  async getAllTasks(): Promise<TasksClientResponse> {
    try {
      const responseBody = await TasksService.getTasks();
      return new TasksClientResponse(200, responseBody);
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  async getCompletedTasks(): Promise<TasksClientResponse> {
    try {
      const responseBody = await TasksService.getTasksCompleted();
      return new TasksClientResponse(200, responseBody);
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  async createTask(payload: CreateTaskPayload): Promise<TasksClientResponse> {
    try {
      const responseBody = await TasksService.postTasks({ requestBody: payload });
      return new TasksClientResponse(200, responseBody);
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  async updateTask(taskId: string, payload: UpdateTaskPayload): Promise<TasksClientResponse> {
    try {
      const responseBody = await TasksService.postTasks1({ id: taskId, requestBody: payload });
      return new TasksClientResponse(200, responseBody);
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  async completeTask(taskId: string): Promise<TasksClientResponse> {
    try {
      const responseBody = await TasksService.postTasksComplete({ id: taskId });
      return new TasksClientResponse(200, responseBody);
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  async incompleteTask(taskId: string): Promise<TasksClientResponse> {
    try {
      const responseBody = await TasksService.postTasksIncomplete({ id: taskId });
      return new TasksClientResponse(200, responseBody);
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  async deleteTask(taskId: string): Promise<TasksClientResponse> {
    try {
      const responseBody = await TasksService.deleteTasks({ id: taskId });
      return new TasksClientResponse(200, responseBody);
    } catch (error) {
      return this.handleApiError(error);
    }
  }
}