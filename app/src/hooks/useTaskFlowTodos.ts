import { addDays, endOfDay, startOfDay } from 'date-fns';
import { Category } from '../types';
import { useTodoStore } from './useTodoStore';

export const useTaskFlowTodos = () => {
    const todos = useTodoStore((state) => state.todos);
    const normalizedTodos = todos.map((todo) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
    }));

    const activeTodos = normalizedTodos.filter((todo) => !todo.completed);
    const sortedActiveTodos = [...activeTodos].sort((a, b) => {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.priority] - order[a.priority];
    });
    const completedTodos = normalizedTodos.filter((todo) => todo.completed);

    const categoryCounts = activeTodos.reduce<Record<Category, number>>((acc, todo) => {
        acc[todo.category] = (acc[todo.category] ?? 0) + 1;
        return acc;
    }, {
        groceries: 0,
        work: 0,
        personal: 0,
        health: 0,
        home: 0,
        social: 0,
        other: 0,
    });

    const totalCount = normalizedTodos.length;
    const completedCount = completedTodos.length;
    const highPriorityCount = activeTodos.filter((todo) => todo.priority === 'high').length;

    const now = new Date();
    const startToday = startOfDay(now);
    const endToday = endOfDay(now);
    const endOfWeek = endOfDay(addDays(now, 7));

    const dueTodayCount = activeTodos.filter(
        (todo) => todo.dueDate && todo.dueDate >= startToday && todo.dueDate <= endToday,
    ).length;

    const dueSoonCount = activeTodos.filter(
        (todo) => todo.dueDate && todo.dueDate >= startToday && todo.dueDate <= endOfWeek,
    ).length;

    const stats = {
        totalCount,
        completedCount,
        completionRate: totalCount ? Math.round((completedCount / totalCount) * 100) : 0,
        highPriorityCount,
        dueTodayCount,
        dueSoonCount,
    };

    return { sortedActiveTodos, completedTodos, stats, categoryCounts };
};