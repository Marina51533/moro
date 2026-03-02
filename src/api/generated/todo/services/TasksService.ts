/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTask } from '../models/CreateTask';
import type { Task } from '../models/Task';
import type { UpdateTask } from '../models/UpdateTask';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * Returns all tasks. Slow service, around 3 seconds
     * @returns Task Successful response
     * @throws ApiError
     */
    public static getTasks(): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks',
        });
    }
    /**
     * Creates task with given text, then returns created task
     * @returns Task Successful response
     * @throws ApiError
     */
    public static postTasks({
        requestBody,
    }: {
        /**
         * text
         */
        requestBody: CreateTask,
    }): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Bad request response`,
            },
        });
    }
    /**
     * Returns all completed tasks
     * @returns Task Successful response
     * @throws ApiError
     */
    public static getTasksCompleted(): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/completed',
        });
    }
    /**
     * Updates text of given task, then returns modified task
     * @returns Task Successful response
     * @throws ApiError
     */
    public static postTasks1({
        id,
        requestBody,
    }: {
        /**
         * ID of task
         */
        id: string,
        /**
         * text
         */
        requestBody: UpdateTask,
    }): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Bad request`,
            },
        });
    }
    /**
     * Deletes given task
     * @returns string Successful response
     * @throws ApiError
     */
    public static deleteTasks({
        id,
    }: {
        /**
         * ID of task
         */
        id: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `ID of task was not found`,
                422: `Bad request`,
            },
        });
    }
    /**
     * Completes given task, then returns modified task
     * @returns Task Successful response
     * @throws ApiError
     */
    public static postTasksComplete({
        id,
    }: {
        /**
         * ID of task
         */
        id: string,
    }): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{id}/complete',
            path: {
                'id': id,
            },
            errors: {
                400: `ID of task was not found`,
                422: `Bad request`,
            },
        });
    }
    /**
     * Incompletes given task, then returns modified task
     * @returns Task Successful response
     * @throws ApiError
     */
    public static postTasksIncomplete({
        id,
    }: {
        /**
         * ID of task
         */
        id: string,
    }): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/{id}/incomplete',
            path: {
                'id': id,
            },
            errors: {
                400: `ID of task was not found`,
                422: `Bad request`,
            },
        });
    }
}
