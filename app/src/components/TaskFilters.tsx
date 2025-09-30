import React from 'react';
import { CalendarClock, Filter, RefreshCcw } from 'lucide-react';
import { CategoryFilter, PriorityFilter } from '../types';

interface TaskFiltersProps {
  categoryOptions: { id: CategoryFilter; label: string }[];
  selectedCategory: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  selectedPriority: PriorityFilter;
  onPriorityChange: (value: PriorityFilter) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showDueSoonOnly: boolean;
  onShowDueSoonChange: (value: boolean) => void;
  onResetFilters: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  categoryOptions,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  searchTerm,
  onSearchChange,
  showDueSoonOnly,
  onShowDueSoonChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          <Filter className="w-4 h-4" />
          <span>Refine your task list</span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Reset filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Category</span>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value as CategoryFilter)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Priority</span>
          <select
            value={selectedPriority}
            onChange={(event) => onPriorityChange(event.target.value as PriorityFilter)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Search</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by keyword"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Due window</span>
          <button
            type="button"
            onClick={() => onShowDueSoonChange(!showDueSoonOnly)}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
              showDueSoonOnly
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <CalendarClock className="w-4 h-4" />
            {showDueSoonOnly ? 'Showing due soon' : 'Due in next 7 days'}
          </button>
        </label>
      </div>
    </div>
  );
};
