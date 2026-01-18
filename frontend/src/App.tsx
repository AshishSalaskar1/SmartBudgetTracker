import React, { useState } from "react";

import { AuthProvider, useAuth } from "./components/AuthProvider";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import MonthlyViewPage from "./pages/MonthlyViewPage";
import UploadPage from "./pages/UploadPage";

type ViewKey = "dashboard" | "upload" | "monthly";

function AppContent() {
  const [view, setView] = useState<ViewKey>("dashboard");
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <NavBar active={view} onNavigate={setView} username={user?.username} onLogout={logout} />
      <main className="page">
        {user ? (
          <ProtectedRoute>
            {view === "dashboard" && <DashboardPage />}
            {view === "monthly" && <MonthlyViewPage />}
            {view === "upload" && <UploadPage />}
          </ProtectedRoute>
        ) : (
          <LandingPage />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

