
import { Brain } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { useTodoStore } from './hooks/useTodoStore';

function App() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div className="min-h-screen bg-gray-50">
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
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            
            {todos.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No todos yet. Add one above to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;