"use client";

import { useMemo, useState } from "react";
import { TextField } from "@/components/TextField";

function isValidEmail(email: string) {
  // simple, good-enough email check for learning purposes
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type PasswordStrength = "weak" | "ok" | "strong";

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; // mixed case
  if (/\d/.test(password)) score++; // has number
  if (/[^a-zA-Z0-9]/.test(password)) score++; // has special char

  if (score <= 2) return "weak";
  if (score <= 4) return "ok";
  return "strong";
}

const strengthConfig: Record<PasswordStrength, { label: string; color: string }> = {
  weak: { label: "Weak", color: "#ef4444" },
  ok: { label: "OK", color: "#f59e0b" },
  strong: { label: "Strong", color: "#22c55e" },
};

type Touched = {
  name: boolean;
  email: boolean;
  password: boolean;
  confirm: boolean;
  terms: boolean;
};

export function SignupForm() {
  // form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // touched state
  const [touched, setTouched] = useState<Touched>({
    name: false,
    email: false,
    password: false,
    confirm: false,
    terms: false,
  });

  const errors = useMemo(() => {
    const e: Record<string, string | null> = {
      name: null,
      email: null,
      password: null,
      confirm: null,
      terms: null,
    };

    const n = name.trim();

    if (n.length < 2) e.name = "Name must be at least 2 characters.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(email)) e.email = "Email format looks incorrect.";

    if (password.length < 8) e.password = "Password must be at least 8 characters.";
    if (confirm !== password) e.confirm = "Passwords do not match.";
    if (!terms) e.terms = "You must accept the terms.";

    return e;
  }, [name, email, password, confirm, terms]);

  const isValid = useMemo(() => {
    return Object.values(errors).every((v) => v === null);
  }, [errors]);

  const hasTouched = useMemo(() => {
    return Object.values(touched).some((v) => v === true);
  }, [touched]);

  const passwordStrength = useMemo(() => {
    if (!password) return null;
    return getPasswordStrength(password);
  }, [password]);

  const [submitted, setSubmitted] = useState<null | {
    name: string;
    email: string;
  }>(null);

  function markTouched<K extends keyof Touched>(key: K) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // mark everything as touched so errors show if invalid
    setTouched({
      name: true,
      email: true,
      password: true,
      confirm: true,
      terms: true,
    });

    if (!isValid) return;

    setSubmitted({ name: name.trim(), email: email.trim() });

    // reset form (optional)
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setTerms(false);
    setTouched({
      name: false,
      email: false,
      password: false,
      confirm: false,
      terms: false,
    });
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Day 4 — Signup Form</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <TextField
          label="Name"
          value={name}
          onChange={setName}
          onBlur={() => markTouched("name")}
          placeholder="Your name"
          error={touched.name ? errors.name : null}
        />

        <TextField
          label="Email"
          value={email}
          onChange={setEmail}
          onBlur={() => markTouched("email")}
          placeholder="you@company.com"
          type="email"
          error={touched.email ? errors.email : null}
        />

        <TextField
          label="Password"
          value={password}
          onChange={setPassword}
          onBlur={() => markTouched("password")}
          placeholder="At least 8 characters"
          type={showPassword ? "text" : "password"}
          error={touched.password ? errors.password : null}
        />

        {passwordStrength && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                flex: 1,
                height: 6,
                backgroundColor: "#eee",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width:
                    passwordStrength === "weak"
                      ? "33%"
                      : passwordStrength === "ok"
                      ? "66%"
                      : "100%",
                  height: "100%",
                  backgroundColor: strengthConfig[passwordStrength].color,
                  transition: "width 0.2s, background-color 0.2s",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: strengthConfig[passwordStrength].color,
              }}
            >
              {strengthConfig[passwordStrength].label}
            </span>
          </div>
        )}

        <TextField
          label="Confirm password"
          value={confirm}
          onChange={setConfirm}
          onBlur={() => markTouched("confirm")}
          placeholder="Type again"
          type={showPassword ? "text" : "password"}
          error={touched.confirm ? errors.confirm : null}
        />

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <span>Show password</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            onBlur={() => markTouched("terms")}
          />
          <span>I accept the terms</span>
        </label>
        {touched.terms && errors.terms && (
          <div style={{ color: "crimson", fontSize: 12 }}>{errors.terms}</div>
        )}

        <button
          type="submit"
          disabled={!isValid || !hasTouched}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: isValid && hasTouched ? "pointer" : "not-allowed",
          }}
        >
          Create account
        </button>
      </form>

      {submitted && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid #eee",
            borderRadius: 12,
          }}
        >
          <div style={{ fontWeight: 700 }}>Signed up ✅</div>
          <div style={{ opacity: 0.8 }}>Name: {submitted.name}</div>
          <div style={{ opacity: 0.8 }}>Email: {submitted.email}</div>
        </div>
      )}
    </div>
  );
}
