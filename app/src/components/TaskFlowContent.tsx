import React, { useMemo, useState } from 'react';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { Brain, ShoppingBag, Briefcase, User, Heart, Home, Users, FileText, CheckCircle } from 'lucide-react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { useTaskFlowTodos } from '../hooks/useTaskFlowTodos';
import { Category, CategoryFilter, PriorityFilter } from '../types';
import { TaskFilters } from './TaskFilters';
import { TaskInsights } from './TaskInsights';

export const TaskFlowContent: React.FC = () => {
  const { sortedActiveTodos, completedTodos, stats, categoryCounts } = useTaskFlowTodos();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedPriority, setSelectedPriority] = useState<PriorityFilter>('all');
  const [showDueSoonOnly, setShowDueSoonOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(
    () => [
      { id: 'work' as Category, icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />, label: 'Work' },
      { id: 'personal' as Category, icon: <User className="w-5 h-5 md:w-6 md:h-6" />, label: 'Personal' },
      { id: 'health' as Category, icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />, label: 'Health' },
      { id: 'home' as Category, icon: <Home className="w-5 h-5 md:w-6 md:h-6" />, label: 'Home' },
      { id: 'groceries' as Category, icon: <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />, label: 'Shopping' },
      { id: 'social' as Category, icon: <Users className="w-5 h-5 md:w-6 md:h-6" />, label: 'Social' },
      { id: 'other' as Category, icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />, label: 'Other' },
    ],
    [],
  );

  const filteredActiveTodos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const today = new Date();
    const startToday = startOfDay(today).getTime();
    const endWindow = endOfDay(addDays(today, 7)).getTime();

    return sortedActiveTodos.filter((todo) => {
      const matchesCategory = selectedCategory === 'all' || todo.category === selectedCategory;
      const matchesPriority = selectedPriority === 'all' || todo.priority === selectedPriority;
      const matchesSearch =
        normalizedSearch.length === 0 || todo.text.toLowerCase().includes(normalizedSearch);
      const matchesDueSoon = !showDueSoonOnly
        || (todo.dueDate
          ? todo.dueDate.getTime() >= startToday && todo.dueDate.getTime() <= endWindow
          : false);

      return matchesCategory && matchesPriority && matchesSearch && matchesDueSoon;
    });
  }, [sortedActiveTodos, selectedCategory, selectedPriority, searchTerm, showDueSoonOnly]);

  const isFilterActive =
    selectedCategory !== 'all' ||
    selectedPriority !== 'all' ||
    showDueSoonOnly ||
    searchTerm.trim().length > 0;

  const categoryOptions = useMemo(
    () => [
      { id: 'all' as CategoryFilter, label: 'All categories' },
      { id: 'work' as CategoryFilter, label: 'Work' },
      { id: 'personal' as CategoryFilter, label: 'Personal' },
      { id: 'health' as CategoryFilter, label: 'Health' },
      { id: 'home' as CategoryFilter, label: 'Home' },
      { id: 'groceries' as CategoryFilter, label: 'Shopping' },
      { id: 'social' as CategoryFilter, label: 'Social' },
      { id: 'other' as CategoryFilter, label: 'Other' },
    ],
    [],
  );

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriority('all');
    setShowDueSoonOnly(false);
    setSearchTerm('');
  };

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

      {/* Insights */}
      <TaskInsights stats={stats} />

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
                  {categoryCounts[category.id]} tasks
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <TaskFilters
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showDueSoonOnly={showDueSoonOnly}
        onShowDueSoonChange={setShowDueSoonOnly}
        onResetFilters={resetFilters}
      />

      {/* Todo Input */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
        <TodoInput />
      </div>

      {/* Active Todos */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Active Tasks</h2>
        <div className="space-y-3 md:space-y-4">
          {filteredActiveTodos.length > 0 ? (
            filteredActiveTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500">
              {isFilterActive
                ? 'No tasks match your filters yet. Try adjusting the filters above.'
                : 'No tasks yet. Add one above to get started!'}
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

 