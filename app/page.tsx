import { ProfileCard } from "@/components/ProfileCard";
import { Counter } from "@/components/Counter";
import { TodoApp } from "@/components/TodoApp";

const people = [
  {
    name: "Ada Lovelace",
    role: "Mathematician",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    company: "Analytical Engine Inc.",
    isOnline: true,
  },
  {
    name: "Grace Hopper",
    role: "Computer Scientist",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    company: "US Navy",
    isOnline: false,
  },
  {
    name: "Alan Turing",
    role: "Cryptanalyst",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    isOnline: true,
  },
];

export default function Home() {
  return (
    <main style={{ padding: 24, display: "grid", gap: 32 }}>
      <header>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>React Course</h1>
        <p style={{ opacity: 0.7 }}>
          Day 1: Components + Props | Day 2: State + Events
        </p>
      </header>

      {/* Day 1 */}
      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Day 1 — Profile Cards</h2>

        <div style={{ display: "grid", gap: 12 }}>
          {people.map((p) => (
            <ProfileCard
              key={p.name}
              name={p.name}
              role={p.role}
              avatarUrl={p.avatarUrl}
              company={p.company}
              isOnline={p.isOnline}
            />
          ))}
        </div>
      </section>

      {/* Day 2 */}
      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Day 2 — Counter</h2>
        <Counter />
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Day 2 — Todos</h2>
        <TodoApp />
      </section>
    </main>
  );
}
