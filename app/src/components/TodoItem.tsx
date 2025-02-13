import React from 'react';
import { format } from 'date-fns';
import { Check, Trash2, HelpCircle, X, ShoppingBag, Briefcase, User, Home, Heart, Users, FileText } from 'lucide-react';
import { Todo } from '../types';
import { useTodoItem } from '../hooks/useTodoItem';

const categoryIcons: Record<string, React.ReactNode> = {
  groceries: <ShoppingBag className="w-5 h-5" />,
  work: <Briefcase className="w-5 h-5" />,
  personal: <User className="w-5 h-5" />,
  health: <Heart className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  social: <Users className="w-5 h-5" />,
  other: <FileText className="w-5 h-5" />
};

const priorityColors = {
  low: 'bg-blue-50 text-blue-700',
  medium: 'bg-yellow-50 text-yellow-700',
  high: 'bg-red-50 text-red-700'
};

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { showReasoning, handleToggle, handleDelete, toggleReasoning } = useTodoItem(todo);

  return (
    <div className="group relative bg-white rounded-lg border border-gray-100 p-3 md:p-4 hover:border-blue-200 transition-colors">
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 hover:border-blue-500'
          } flex items-center justify-center transition-colors`}
        >
          {todo.completed && <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <div className={`flex-shrink-0 text-blue-600 ${todo.completed ? 'opacity-50' : ''}`}>
              {categoryIcons[todo.category]}
            </div>
            <div className={`flex-1 text-sm md:text-base font-medium break-words ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
            }`}>
              {todo.text}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center text-xs">
            {todo.dueDate && (
              <span className="inline-flex bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                {format(todo.dueDate, 'MMM d')}
              </span>
            )}
            
            <span className={`inline-flex px-2 py-1 rounded-full font-medium ${priorityColors[todo.priority]}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>

            <button
              onClick={toggleReasoning}
              className="inline-flex items-center gap-1 text-gray-500 hover:text-blue-600 font-medium"
            >
              {showReasoning ? <X className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
              {showReasoning ? 'Hide AI reasoning' : 'Show AI reasoning'}
            </button>
          </div>

          {showReasoning && (
            <div className="mt-3 text-xs md:text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              {todo.aiReasoning}
            </div>
          )}
        </div>

        <button
          onClick={handleDelete}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
          aria-label="Delete todo"
        >
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};