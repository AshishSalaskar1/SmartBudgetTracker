import React from "react";

export default function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
      <span>{message}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "var(--muted)",
  },
  spinner: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid var(--border)",
    borderTopColor: "var(--accent)",
    animation: "spin 1s linear infinite",
  },
};
