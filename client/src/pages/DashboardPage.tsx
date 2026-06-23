import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../api/projects";
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
    return <p className="page-message">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="page-message page-message--error">{error}</p>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Overview of your projects and tasks</p>
        </div>
      </header>

      <section className="stat-grid">
        <StatCard label="Total Projects" value={stats.totalProjects} accent="blue" />
        <StatCard label="Total Tasks" value={stats.totalTasks} accent="violet" />
        <StatCard label="Completed Tasks" value={stats.completedTasks} accent="green" />
        <StatCard
          label="Completion Rate"
          value={`${stats.completionPercentage}%`}
          hint={`${stats.completedTasks} of ${stats.totalTasks} tasks done`}
          accent="amber"
        />
      </section>

      <section className="panel">
        <h2>Quick actions</h2>
        <div className="quick-actions">
          <Link to="/projects" className="btn btn-secondary">
            Manage projects
          </Link>
          <Link to="/tasks" className="btn btn-secondary">
            View all tasks
          </Link>
        </div>
      </section>
    </div>
  );
}
