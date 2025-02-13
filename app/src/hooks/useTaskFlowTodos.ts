import { useTodoStore } from './useTodoStore';

export const useTaskFlowTodos = () => {
    const todos = useTodoStore((state) => state.todos);
    const activeTodos = todos.filter((todo) => !todo.completed);
    const sortedActiveTodos = [...activeTodos].sort((a, b) => {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.priority] - order[a.priority];
    });
    const completedTodos = todos.filter((todo) => todo.completed);

    return { sortedActiveTodos, completedTodos };
}; 