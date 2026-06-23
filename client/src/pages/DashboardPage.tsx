import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../api/projects";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressBar from "../components/ProgressBar";
import StatCard from "../components/StatCard";
import type { DashboardStats } from "../types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading dashboard..." />;
  }

  if (error) {
    return <p className="page-message page-message--error">{error}</p>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="page">
      <header className="page-header page-header--hero">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Track progress across all your projects at a glance</p>
        </div>
      </header>

      <section className="stat-grid">
        <StatCard
          label="Total Projects"
          value={stats.totalProjects}
          icon="◆"
          accent="blue"
          delay={80}
          animate
        />
        <StatCard
          label="Total Tasks"
          value={stats.totalTasks}
          icon="☑"
          accent="violet"
          delay={160}
          animate
        />
        <StatCard
          label="Completed Tasks"
          value={stats.completedTasks}
          icon="✓"
          accent="green"
          delay={240}
          animate
        />
        <StatCard
          label="Completion Rate"
          value={`${stats.completionPercentage}%`}
          hint={`${stats.completedTasks} of ${stats.totalTasks} tasks done`}
          icon="⚡"
          accent="amber"
          delay={320}
        />
      </section>

      <section className="panel panel--glow">
        <ProgressBar value={stats.completionPercentage} />
      </section>

      <section className="panel">
        <h2>Quick actions</h2>
        <div className="quick-actions">
          <Link to="/projects" className="btn btn-secondary btn-glow">
            Manage projects
          </Link>
          <Link to="/tasks" className="btn btn-secondary btn-glow">
            View all tasks
          </Link>
        </div>
      </section>
    </div>
  );
}
