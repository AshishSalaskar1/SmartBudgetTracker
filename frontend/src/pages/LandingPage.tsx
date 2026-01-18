import React, { useState } from "react";

import { useAuth } from "../components/AuthProvider";

export default function LandingPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page landing">
      <section className="landing-hero">
        <div className="hero-orb orb-1" aria-hidden="true" />
        <div className="hero-orb orb-2" aria-hidden="true" />
        <div className="hero-copy">
          <span className="pill">Built for smart, local-first budgeting</span>
          <h1 className="hero-title">Track every rupee with clarity.</h1>
          <p className="hero-subtitle">
            SmartBudgetTracker turns your bank statements into a clean, modern dashboard with automatic categories.
            <br />
            <span className="accent-text">Insights and trend views</span> — all on your machine.
          </p>
          <div className="cta-row">
            <button className="button primary" onClick={() => document.getElementById("login")?.scrollIntoView({ behavior: "smooth" })}>
              Log in to your dashboard
            </button>
            <button className="button ghost" onClick={() => document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" })}>
              Explore the product
            </button>
          </div>
          <div className="hero-metrics">
            <div>
              <h4>2 min</h4>
              <p className="muted">Statement processing goal</p>
            </div>
            <div>
              <h4>AI-ready</h4>
              <p className="muted">Azure OpenAI extraction</p>
            </div>
            <div>
              <h4>Private</h4>
              <p className="muted">Local-first storage</p>
            </div>
          </div>
        </div>
        <div className="hero-panel card anchor-offset" id="login">
          <h2 className="section-title">Welcome back</h2>
          <p className="muted">Sign in to continue to your dashboard.</p>
          <form onSubmit={onSubmit} className="form" style={{ display: "grid", gap: 12, marginTop: 12 }}>
            <label className="muted">
              Username
              <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="muted">
              Password
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="button primary" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </section>

      <section className="landing-strip">
        <div>
          <h3>Spending snapshots</h3>
          <p className="muted">Monthly and yearly rollups designed for fast decisions.</p>
        </div>
        <div>
          <h3>Smarter categories</h3>
          <p className="muted">Auto-categorized transactions with clearly labeled pie charts.</p>
        </div>
        <div>
          <h3>Replace with confidence</h3>
          <p className="muted">Re-upload any month without losing your history.</p>
        </div>
      </section>

      <section id="preview" className="landing-preview">
        <div className="preview-copy">
          <h2 className="section-title">Designed for everyday clarity</h2>
          <p className="muted">
            See income, expenses, and trends in one place. The dashboard highlights monthly insights and yearly
            performance while keeping every transaction searchable.
          </p>
          <ul className="preview-list">
            <li>Monthly summary cards with net flow</li>
            <li>Category breakdowns with consistent labels</li>
            <li>Daily spend trends and yearly rollups</li>
          </ul>
        </div>
        <div className="preview-panel card">
          <div className="preview-header">
            <span className="pill">January overview</span>
            <h3>₹1,28,450 Net Savings</h3>
          </div>
          <div className="preview-grid">
            <div className="preview-tile">
              <p className="muted">Income</p>
              <h4>₹3,45,200</h4>
            </div>
            <div className="preview-tile">
              <p className="muted">Expenses</p>
              <h4>₹2,16,750</h4>
            </div>
            <div className="preview-tile">
              <p className="muted">Top Category</p>
              <h4>Food & Dining</h4>
            </div>
          </div>
          <div className="preview-bars">
            <div className="bar" style={{ height: "60%" }} />
            <div className="bar" style={{ height: "72%" }} />
            <div className="bar" style={{ height: "45%" }} />
            <div className="bar" style={{ height: "82%" }} />
            <div className="bar" style={{ height: "64%" }} />
          </div>
        </div>
      </section>


      <section className="card landing-steps">
        <h2 className="section-title">From statement to insights in minutes</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>1. Upload</h4>
            <p className="muted">Drop your PDF, CSV, or XLSX with month and year.</p>
          </div>
          <div className="feature-card">
            <h4>2. Review</h4>
            <p className="muted">AI extracts transactions with categories and reasons.</p>
          </div>
          <div className="feature-card">
            <h4>3. Act</h4>
            <p className="muted">Spot patterns, manage budgets, and plan ahead.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta card">
        <div>
          <h2 className="section-title">Ready to regain control?</h2>
          <p className="muted">Log in and see your statement data transform instantly.</p>
        </div>
        <button className="button primary" onClick={() => document.getElementById("login")?.scrollIntoView({ behavior: "smooth" })}>
          Get started
        </button>
      </section>
    </div>
  );
}
