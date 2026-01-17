import type { Filter } from "@/components/todos/types";

type TodoFiltersProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  counts: Record<Filter, number>;
};

const filters: Filter[] = ["all", "active", "completed"];

export function TodoFilters({ filter, onFilterChange, counts }: TodoFiltersProps) {
  return (
    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          aria-pressed={filter === f}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #ddd",
            backgroundColor: filter === f ? "#333" : "transparent",
            color: filter === f ? "#fff" : "inherit",
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          {f} ({counts[f]})
        </button>
      ))}
    </div>
  );
}
