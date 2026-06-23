import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { apiFetch } from "../api/client";

const navItems = [
  { to: "/", label: "Dashboard", end: true, icon: "◫" },
  { to: "/projects", label: "Projects", end: false, icon: "◆" },
  { to: "/tasks", label: "Tasks", end: false, icon: "☑" },
];

type HealthStatus = "connected" | "disconnected" | "checking";

export default function Layout() {
  const [dbStatus, setDbStatus] = useState<HealthStatus>("checking");

  useEffect(() => {
    apiFetch<{ database: string }>("/health")
      .then((data) => setDbStatus(data.database === "connected" ? "connected" : "disconnected"))
      .catch(() => setDbStatus("disconnected"));
  }, []);

  return (
    <div className="layout">
      <div className="ambient-bg" aria-hidden="true">
        <span className="ambient-orb ambient-orb--1" />
        <span className="ambient-orb ambient-orb--2" />
        <span className="ambient-orb ambient-orb--3" />
      </div>

      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <div>
            <p className="brand-title">TaskFlow</p>
            <p className="brand-subtitle">Management Platform</p>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              <span className="nav-link__icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className={`status-dot status-dot--${dbStatus}`} />
          <span className="sidebar-footer__text">
            {dbStatus === "checking" && "Checking database..."}
            {dbStatus === "connected" && "Database connected"}
            {dbStatus === "disconnected" && "Database offline"}
          </span>
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
