"use client";

import type { Todo } from "@/components/todos/types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li style={{ marginTop: 8 }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
          {todo.text}
        </span>
        <button onClick={() => onRemove(todo.id)} style={{ marginLeft: "auto" }}>
          ✕
        </button>
      </label>
    </li>
  );
}

