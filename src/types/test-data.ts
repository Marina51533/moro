export interface CityFilterVariant {
  city: string;
  hasPositions: boolean;
}

export interface UiTestData {
  careerPagePath: string;
  cityFilterVariants: CityFilterVariant[];
}

export interface CreateTaskPayload {
  text: string;
}

export interface UpdateTaskPayload {
  text: string;
}

export interface ApiTestData {
  createTask: CreateTaskPayload;
  updateTask: UpdateTaskPayload;
  invalidTask: CreateTaskPayload;
  notFoundTaskId: string;
}