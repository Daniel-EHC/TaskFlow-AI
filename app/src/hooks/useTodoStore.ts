import { create } from 'zustand';
import { Todo } from '../types';
import { analyzeTodoWithAI } from '../lib/ai';

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: async (text: string) => {
    const aiAnalysis = await analyzeTodoWithAI(text);

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      ...aiAnalysis,
    };

    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));