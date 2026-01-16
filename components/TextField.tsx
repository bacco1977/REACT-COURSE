"use client";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: "text" | "email" | "password";
  error?: string | null;
};

export function TextField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
}: TextFieldProps) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontWeight: 600 }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type}
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: error ? "1px solid crimson" : "1px solid #ddd",
          outline: "none",
        }}
      />
      {error && <div style={{ color: "crimson", fontSize: 12 }}>{error}</div>}
    </div>
  );
}
