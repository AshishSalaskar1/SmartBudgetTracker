import React from "react";

export default function ErrorBanner({ message }: { message: string }) {
  return <div style={styles.banner}>{message}</div>;
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    background: "rgba(248, 113, 113, 0.12)",
    color: "var(--danger)",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(248, 113, 113, 0.4)",
  },
};
