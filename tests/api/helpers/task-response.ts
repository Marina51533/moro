export type TaskResponse = {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
};
