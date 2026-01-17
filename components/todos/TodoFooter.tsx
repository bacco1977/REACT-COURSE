"use client";

type TodoFooterProps = {
  remaining: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
};

export function TodoFooter({
  remaining,
  hasCompleted,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div style={{ marginTop: 12, display: "flex", gap: 12, opacity: 0.8 }}>
      <span>{remaining} remaining</span>
      <button onClick={onClearCompleted} disabled={!hasCompleted}>
        Clear completed
      </button>
    </div>
  );
}
