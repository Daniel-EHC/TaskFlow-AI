import { useState, useCallback } from 'react';
import { useTodoStore } from './useTodoStore';

export function useTodoInput() {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const addTodo = useTodoStore((state) => state.addTodo);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsLoading(true);
        try {
            await addTodo(text);
            setText('');
        } finally {
            setIsLoading(false);
        }
    }, [text, addTodo]);

    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }, []);

    return {
        text,
        isLoading,
        handleSubmit,
        handleTextChange,
    };
} 