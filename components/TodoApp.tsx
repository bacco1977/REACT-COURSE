"use client";

import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export function TodoApp() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo() {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      done: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Todos</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ marginTop: 12, paddingLeft: 18 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ marginTop: 8 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(t.id)}
              />
              <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                {t.text}
              </span>
              <button onClick={() => removeTodo(t.id)} style={{ marginLeft: "auto" }}>
                ✕
              </button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
