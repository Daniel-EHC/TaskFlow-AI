import { format } from 'date-fns';
import { Check, Trash2, HelpCircle, X } from 'lucide-react';
import { Todo } from '../types';
import { useTodoItem } from '../hooks/useTodoItem';

const categoryIcons = {
  groceries: '🛒',
  work: '💼',
  personal: '👤',
  health: '🏥',
  home: '🏠',
  social: '👥',
  other: '📌'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { showReasoning, handleToggle, handleDelete, toggleReasoning } = useTodoItem(todo);

  return (
    <div className="group relative bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          } flex items-center justify-center transition-colors`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="text-xl">{categoryIcons[todo.category]}</span>
            <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 items-center text-sm">
            {todo.dueDate && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                📅 {format(todo.dueDate, 'PPP')}
              </span>
            )}
            
            <span className={`px-2 py-1 rounded ${priorityColors[todo.priority]}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
            </span>

            <button
              onClick={toggleReasoning}
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              {showReasoning ? <X className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
              {showReasoning ? 'Hide reasoning' : 'Why this category?'}
            </button>
          </div>

          {showReasoning && (
            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              {todo.aiReasoning}
            </div>
          )}
        </div>

        <button
          onClick={handleDelete}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}