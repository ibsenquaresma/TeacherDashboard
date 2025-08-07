export type TaskType = 'text' | 'upload' | 'multiple-choice';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: TaskType;
  module?: string;
  theme?: string;
}
