import React from "react";

import ThemeToggle from "./ThemeToggle";

type ViewKey = "dashboard" | "upload" | "monthly";

interface NavBarProps {
  active: ViewKey;
  onNavigate: (view: ViewKey) => void;
  username?: string | null;
  onLogout?: () => void;
}

export default function NavBar({ active, onNavigate, username, onLogout }: NavBarProps) {
  const items: { key: ViewKey; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "monthly", label: "Monthly View" },
    { key: "upload", label: "Upload" },
  ];

  const isLoggedIn = Boolean(username);

  return (
    <nav className="nav">
      <h3 className="nav-logo">SmartBudgetTracker</h3>
      <div className="nav-links">
        {isLoggedIn &&
          items.map((item) => (
            <button
              key={item.key}
              className={`nav-btn ${active === item.key ? "active" : ""}`}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          ))}
      </div>
      <div className="nav-user">
        <ThemeToggle />
        {isLoggedIn ? (
          <>
            {username && <span className="muted">{username}</span>}
            {onLogout && (
              <button className="button ghost" onClick={onLogout}>
                Logout
              </button>
            )}
          </>
        ) : (
          <button
            className="button primary"
            onClick={() => {
              const target = document.getElementById("login");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.hash = "#login";
              }
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
