/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Task = {
    /**
     * Identification
     */
    id: string;
    /**
     * Content
     */
    text: string;
    /**
     * Status
     */
    completed: boolean;
    /**
     * Date when task was created (Timestamp)
     */
    createdDate: number;
    /**
     * Date when task was completed (Timestamp)
     */
    completedDate?: number;
};

