"use client";

import { useState } from "react";

type TodoInputProps = {
  onAdd: (text: string) => void;
  disabled?: boolean;
};

export function TodoInput({ onAdd, disabled }: TodoInputProps) {
  const [text, setText] = useState("");

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Add a todo..."
        style={{ flex: 1 }}
        disabled={disabled}
      />
      <button onClick={submit} disabled={disabled || !text.trim()}>
        Add
      </button>
    </div>
  );
}

