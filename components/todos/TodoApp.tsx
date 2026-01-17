"use client";

import { useMemo, useState } from "react";
import type { Todo, Filter } from "@/components/todos/types";
import { TodoInput } from "@/components/todos/TodoInput";
import { TodoList } from "@/components/todos/TodoList";
import { TodoFooter } from "@/components/todos/TodoFooter";
import { TodoFilters } from "@/components/todos/TodoFilters";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  function addTodo(text: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      done: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
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

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);
  const completedCount = useMemo(() => todos.filter((t) => t.done).length, [todos]);
  const hasCompleted = completedCount > 0;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.done);
      case "completed":
        return todos.filter((t) => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Todos</h2>
      <TodoInput onAdd={addTodo} />
      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        counts={{ all: todos.length, active: remaining, completed: completedCount }}
      />
      <TodoFooter
        remaining={remaining}
        hasCompleted={hasCompleted}
        onClearCompleted={clearCompleted}
      />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onRemove={removeTodo} />
    </div>
  );
}
