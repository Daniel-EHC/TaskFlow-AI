import React from 'react';
import { Brain } from 'lucide-react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { useTaskFlowTodos } from '../hooks/useTaskFlowTodos';

export const TaskFlowContent: React.FC = () => {
  const { sortedActiveTodos, completedTodos } = useTaskFlowTodos();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-12 h-12 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-900">TaskFlow AI</h1>
        </div>
        <p className="text-gray-600">
          Add tasks naturally and let AI organize them for you
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <TodoInput />

        <div className="w-full max-w-2xl space-y-4">
          {sortedActiveTodos.length > 0 ? (
            sortedActiveTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No todos yet. Add one above to get started!
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-green-600 mb-4">Completed Tasks</h2>
              {completedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

 