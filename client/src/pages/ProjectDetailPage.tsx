import { type FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, updateProject } from "../api/projects";
import { createTask, deleteTask, updateTask } from "../api/tasks";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import PriorityBadge from "../components/PriorityBadge";
import StatusBadge from "../components/StatusBadge";
import { useToast } from "../context/ToastContext";
import type { Priority, ProjectDetail, Status } from "../types";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [savingProject, setSavingProject] = useState(false);

  async function loadProject() {
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const data = await getProject(id);
      setProject(data);
      setEditName(data.name);
      setEditDescription(data.description ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProject();
  }, [id]);

  async function handleUpdateProject(event: FormEvent) {
    event.preventDefault();
    if (!id || !editName.trim()) return;

    setSavingProject(true);
    setError("");

    try {
      await updateProject(id, {
        name: editName.trim(),
        description: editDescription.trim() || undefined,
      });
      showToast("Project updated");
      await loadProject();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update project";
      setError(message);
      showToast(message, "error");
    } finally {
      setSavingProject(false);
    }
  }
  function openModal() {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setModalOpen(true);
  }

  function closeModal() {
    if (submitting) return;
    setModalOpen(false);
  }

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    if (!id || !title.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      await createTask({
        projectId: id,
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      });
      setModalOpen(false);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      showToast("Task added");
      await loadProject();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create task";
      setError(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleStatus(taskId: string, currentStatus: Status) {
    setError("");
    try {
      await updateTask(taskId, { status: currentStatus === "OPEN" ? "DONE" : "OPEN" });
      showToast(currentStatus === "OPEN" ? "Task marked as done" : "Task reopened");
      await loadProject();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update task";
      setError(message);
      showToast(message, "error");
    }
  }

  async function handleDeleteTask(taskId: string, taskTitle: string) {
    if (!window.confirm(`Delete task "${taskTitle}"?`)) return;

    setError("");
    try {
      await deleteTask(taskId);
      showToast("Task deleted");
      await loadProject();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete task";
      setError(message);
      showToast(message, "error");
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading project..." />;
  }

  if (error && !project) {
    return (
      <div className="page">
        <p className="page-message page-message--error">{error}</p>
        <Link to="/projects" className="btn btn-secondary">
          Back to projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="page">
      <header className="page-header page-header--row">
        <div>
          <Link to="/projects" className="back-link">
            ← Back to projects
          </Link>
          <h1>{project.name}</h1>
          <p className="page-subtitle">{project.tasks.length} tasks in this project</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={openModal}>
          + New task
        </button>
      </header>

      <section className="panel">
        <h2>Edit project</h2>
        <form className="form-grid form-grid--wide" onSubmit={handleUpdateProject}>
          <label>
            Name
            <input value={editName} onChange={(event) => setEditName(event.target.value)} required />
          </label>
          <label>
            Description
            <input
              value={editDescription}
              onChange={(event) => setEditDescription(event.target.value)}
              placeholder="Optional description"
            />
          </label>
          <button className="btn btn-secondary" type="submit" disabled={savingProject}>
            {savingProject ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>

      <section className="panel">
        <h2>Add task</h2>
        <form className="form-grid form-grid--wide" onSubmit={handleCreateTask}>
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Implement homepage"
              required
            />
          </label>
          <label>
            Description
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional description"
            />
          </label>
          <label>
            Priority
            <select value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add task"}
          </button>
        </form>
      </section>

      {error && <p className="page-message page-message--error">{error}</p>}

      <section className="panel">
        <h2>Tasks ({project.tasks.length})</h2>
        {project.tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            message='Click "New task" to add one to this project.'
          />
        ) : (
          <div className="table-wrap">
            <table className="data-table data-table--responsive">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {project.tasks.map((task) => (
                  <tr key={task.id}>
                    <td data-label="Title">
                      <strong>{task.title}</strong>
                      {task.description && <p className="table-subtext">{task.description}</p>}
                    </td>
                    <td data-label="Priority">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td data-label="Status">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="table-actions" data-label="Actions">
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
                        onClick={() => handleDeleteTask(task.id, task.title)}
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

      <Modal open={modalOpen} title="Create task" onClose={closeModal}>
        <form className="modal-form" onSubmit={handleCreateTask}>
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Implement homepage"
              required
              autoFocus
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional description"
              rows={3}
            />
          </label>
          <label>
            Priority
            <select value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
          <div className="modal-actions">
            <button className="btn btn-secondary" type="button" onClick={closeModal} disabled={submitting}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create task"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
