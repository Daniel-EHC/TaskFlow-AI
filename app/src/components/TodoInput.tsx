import React from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';
import { useTodoInput } from '../hooks/useTodoInput';

export const TodoInput: React.FC = () => {
  const { text, isLoading, handleSubmit, handleTextChange } = useTodoInput();

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Add a new task naturally (e.g., 'Buy milk next Thursday' or 'Urgent meeting tomorrow')"
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border-2 border-gray-100 rounded-xl 
            placeholder:text-gray-400 focus:outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-50
            disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={isLoading ? 'Adding task...' : 'Add task'}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <PlusCircle className="w-6 h-6" />
          )}
        </button>
      </div>
      {isLoading && (
        <p className="mt-2 text-sm text-blue-600">AI is analyzing and categorizing your task...</p>
      )}
    </form>
  );
};