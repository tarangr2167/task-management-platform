import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projects";
import { deleteTask, getTasks, updateTask } from "../api/tasks";
import EmptyState from "../components/EmptyState";
import PriorityBadge from "../components/PriorityBadge";
import StatusBadge from "../components/StatusBadge";
import type { Priority, ProjectListItem, Status, Task } from "../types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState<"" | Status>("");
  const [priority, setPriority] = useState<"" | Priority>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks({
        projectId: projectId || undefined,
        status: status || undefined,
        priority: priority || undefined,
      });
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    loadTasks();
  }, [projectId, status, priority]);

  async function toggleStatus(taskId: string, currentStatus: Status) {
    setError("");
    try {
      await updateTask(taskId, { status: currentStatus === "OPEN" ? "DONE" : "OPEN" });
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  }

  async function handleDelete(taskId: string, taskTitle: string) {
    if (!window.confirm(`Delete task "${taskTitle}"?`)) return;

    setError("");
    try {
      await deleteTask(taskId);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Tasks</h1>
          <p className="page-subtitle">Browse and filter tasks across all projects</p>
        </div>
      </header>

      <section className="panel">
        <h2>Filters</h2>
        <div className="filter-row">
          <label>
            Project
            <select value={projectId} onChange={(event) => setProjectId(event.target.value)}>
              <option value="">All projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select value={status} onChange={(event) => setStatus(event.target.value as "" | Status)}>
              <option value="">All statuses</option>
              <option value="OPEN">Open</option>
              <option value="DONE">Done</option>
            </select>
          </label>
          <label>
            Priority
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as "" | Priority)}
            >
              <option value="">All priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
        </div>
      </section>

      {error && <p className="page-message page-message--error">{error}</p>}

      <section className="panel">
        <h2>All tasks</h2>
        {loading ? (
          <p className="page-message">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <EmptyState title="No tasks found" message="Try changing filters or create tasks inside a project." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <strong>{task.title}</strong>
                      {task.description && <p className="table-subtext">{task.description}</p>}
                    </td>
                    <td>
                      {task.project ? (
                        <Link to={`/projects/${task.project.id}`} className="inline-link">
                          {task.project.name}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td>
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="table-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        type="button"
                        onClick={() => toggleStatus(task.id, task.status)}
                      >
                        Mark {task.status === "OPEN" ? "done" : "open"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={() => handleDelete(task.id, task.title)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
