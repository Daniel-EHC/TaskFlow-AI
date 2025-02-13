export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
  dueDate: Date | null;
  priority: Priority;
  aiReasoning: string;
}

export type Category =
  | 'groceries'
  | 'work'
  | 'personal'
  | 'health'
  | 'home'
  | 'social'
  | 'other';

export type Priority = 'low' | 'medium' | 'high';