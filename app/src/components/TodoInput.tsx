import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useTodoInput } from '../hooks/useTodoInput';

export const TodoInput: React.FC = () => {
  const { text, isLoading, handleSubmit, handleTextChange } = useTodoInput();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Add a new task (e.g., 'Buy milk next Thursday' or 'Urgent meeting with team tomorrow')"
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};