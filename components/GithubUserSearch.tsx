"use client";

import { useState } from "react";

type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
  html_url: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function GithubUserSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GithubUser | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function searchUser() {
    const trimmed = username.trim();
    if (!trimmed) return;

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(`https://api.github.com/users/${trimmed}`);

      if (!res.ok) {
        // Handle rate limiting (403 with rate limit message)
        if (res.status === 403) {
          const data = await res.json();
          if (data.message?.includes("rate limit")) {
            throw new Error("Rate limited by GitHub, try again later.");
          }
        }

        if (res.status === 404) {
          throw new Error(`User "${trimmed}" not found.`);
        }

        throw new Error(`Request failed (HTTP ${res.status})`);
      }

      const data: GithubUser = await res.json();
      setUser(data);
      setStatus("success");
    } catch (err: unknown) {
      setUser(null);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") searchUser();
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Day 3 — GitHub User Search</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter GitHub username..."
          style={{ flex: 1 }}
        />
        <button onClick={searchUser} disabled={status === "loading" || !username.trim()}>
          {status === "loading" ? "Searching..." : "Search"}
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        {status === "idle" && <p>Type a username to search.</p>}

        {status === "loading" && <p>Loading...</p>}

        {status === "error" && (
          <p style={{ color: "crimson" }}>Error: {error}</p>
        )}

        {status === "success" && user && (
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 12,
              marginTop: 12,
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width={72}
              height={72}
              style={{ borderRadius: 999 }}
            />

            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>
                {user.name ?? user.login}
              </div>

              {user.bio && <div style={{ opacity: 0.8 }}>{user.bio}</div>}

              <div style={{ display: "flex", gap: 12, opacity: 0.8 }}>
                <span>Followers: {user.followers}</span>
                <span>Repos: {user.public_repos}</span>
              </div>

              <a href={user.html_url} target="_blank">
                View profile →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
