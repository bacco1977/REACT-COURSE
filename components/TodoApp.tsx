"use client";

import { useMemo, useState } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export function TodoApp() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
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

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addTodo();
  }

  const remaining = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  );

  const hasCompleted = todos.some((t) => t.done);

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Todos</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Add a todo..."
          style={{ flex: 1 }}
        />
        <button onClick={addTodo} disabled={!text.trim()}>
          Add
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 12, opacity: 0.8 }}>
        <span>{remaining} remaining</span>

        <button onClick={clearCompleted} disabled={!hasCompleted}>
          Clear completed
        </button>
      </div>

      {todos.length === 0 ? (
        <p style={{ marginTop: 12, opacity: 0.7 }}>
          No todos yet — add one above ✅
        </p>
      ) : (
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
                <button
                  onClick={() => removeTodo(t.id)}
                  style={{ marginLeft: "auto" }}
                >
                  ✕
                </button>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
