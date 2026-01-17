"use client";

import type { Todo } from "@/components/todos/types";
import { TodoItem } from "@/components/todos/TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return <p style={{ marginTop: 12, opacity: 0.7 }}>No todos yet ✅</p>;
  }

  return (
    <ul style={{ marginTop: 12, paddingLeft: 18 }}>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}

