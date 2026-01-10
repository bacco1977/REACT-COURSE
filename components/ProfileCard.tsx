import Image from "next/image";

type ProfileCardProps = {
  name: string;
  role: string;
  avatarUrl: string;
  company?: string;
  isOnline?: boolean;
};

export function ProfileCard({
  name,
  role,
  avatarUrl,
  company,
  isOnline,
}: ProfileCardProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 12,
        maxWidth: 360,
      }}
    >
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <Image
          src={avatarUrl}
          alt={name}
          fill
          sizes="56px"
          style={{ borderRadius: 999, objectFit: "cover" }}
        />

        {isOnline !== undefined && (
          <span
            aria-label={isOnline ? "Online" : "Offline"}
            title={isOnline ? "Online" : "Offline"}
            style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: isOnline ? "#22c55e" : "#9ca3af",
              border: "2px solid white",
            }}
          />
        )}
      </div>

      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ opacity: 0.7 }}>{role}</div>
        {company && <div style={{ fontSize: 12, opacity: 0.5 }}>{company}</div>}
      </div>
    </div>
  );
}
