import { useState, useCallback } from 'react';
import { Todo } from '../types';
import { useTodoStore } from './useTodoStore';

export function useTodoItem(todo: Todo) {
    const [showReasoning, setShowReasoning] = useState(false);
    const { toggleTodo, deleteTodo } = useTodoStore();

    const handleToggle = useCallback(() => toggleTodo(todo.id), [toggleTodo, todo.id]);
    const handleDelete = useCallback(() => deleteTodo(todo.id), [deleteTodo, todo.id]);
    const toggleReasoning = useCallback(() => setShowReasoning(prev => !prev), []);

    return {
        showReasoning,
        handleToggle,
        handleDelete,
        toggleReasoning,
    };
} 