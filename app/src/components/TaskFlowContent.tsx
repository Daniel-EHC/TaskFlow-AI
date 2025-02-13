import React from 'react';
import { Brain, ShoppingBag, Briefcase, User, Heart, Home, Users, FileText, CheckCircle } from 'lucide-react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { useTaskFlowTodos } from '../hooks/useTaskFlowTodos';
import { Category } from '../types';

export const TaskFlowContent: React.FC = () => {
  const { sortedActiveTodos, completedTodos } = useTaskFlowTodos();

  const categories: { id: Category; icon: React.ReactNode; label: string }[] = [
    { id: 'work', icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />, label: 'Work' },
    { id: 'personal', icon: <User className="w-5 h-5 md:w-6 md:h-6" />, label: 'Personal' },
    { id: 'health', icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />, label: 'Health' },
    { id: 'home', icon: <Home className="w-5 h-5 md:w-6 md:h-6" />, label: 'Home' },
    { id: 'groceries', icon: <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />, label: 'Shopping' },
    { id: 'social', icon: <Users className="w-5 h-5 md:w-6 md:h-6" />, label: 'Social' },
    { id: 'other', icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />, label: 'Other' }
  ];

  return (
    <div className="w-full max-w-lg md:max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
          <Brain className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            TaskFlow AI
          </h1>
        </div>
        <p className="text-sm md:text-base text-gray-600">Add tasks naturally and let AI organize them for you</p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg text-blue-600">
                {category.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-sm md:text-base text-gray-900">{category.label}</h3>
                <p className="text-xs md:text-sm text-gray-500 truncate">
                  {sortedActiveTodos.filter((todo) => todo.category === category.id).length} tasks
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Todo Input */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
        <TodoInput />
      </div>

      {/* Active Todos */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Active Tasks</h2>
        <div className="space-y-3 md:space-y-4">
          {sortedActiveTodos.length > 0 ? (
            sortedActiveTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500">
              No tasks yet. Add one above to get started!
            </div>
          )}
        </div>
      </div>

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            <h2 className="text-lg md:text-xl font-semibold text-blue-600">Completed Tasks</h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

 