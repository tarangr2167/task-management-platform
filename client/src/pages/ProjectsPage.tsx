import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createProject, deleteProject, getProjects } from "../api/projects";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../context/ToastContext";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import type { ProjectListItem } from "../types";

export default function ProjectsPage() {
  const { showToast } = useToast();
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query),
    );
  }, [projects, search]);

  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openModal() {
    setName("");
    setDescription("");
    setModalOpen(true);
  }

  function closeModal() {
    if (submitting) return;
    setModalOpen(false);
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      await createProject({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      setModalOpen(false);
      setName("");
      setDescription("");
      showToast("Project created successfully");
      await loadProjects();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create project";
      setError(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, projectName: string) {
    if (!window.confirm(`Delete "${projectName}" and all its tasks?`)) return;

    setError("");
    try {
      await deleteProject(id);
      setProjects((current) => current.filter((project) => project.id !== id));
      showToast("Project deleted");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete project";
      setError(message);
      showToast(message, "error");
    }
  }

  return (
    <div className="page">
      <header className="page-header page-header--row">
        <div>
          <h1>Projects</h1>
          <p className="page-subtitle">Create and manage your project portfolio</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={openModal}>
          + New project
        </button>
      </header>

      {error && <p className="page-message page-message--error">{error}</p>}

      <section className="panel">
        <div className="panel-header">
          <h2>All projects</h2>
          <input
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
          />
        </div>
        {loading ? (
  <LoadingSpinner label="Loading projects..." />
) : filteredProjects.length === 0 ? (
  <EmptyState
    title={projects.length === 0 ? "No projects yet" : "No matching projects"}
    message={
      projects.length === 0
        ? "Create your first project above to get started."
        : "Try a different search term."
    }
  />
) : (
  <div className="card-grid">
    {filteredProjects.map((project, index) => (
      <article
        key={project.id}
        className="card card--interactive"
        style={{ animationDelay: `${index * 90}ms` }}
      >
        <div className="card-header">
          <div>
            <h3>{project.name}</h3>
            <p className="card-meta">{project._count.tasks} tasks</p>
          </div>
          <button
            className="btn btn-danger btn-sm"
            type="button"
            onClick={() => handleDelete(project.id, project.name)}
          >
            Delete
          </button>
        </div>

        {project.description && (
          <p className="card-body">{project.description}</p>
        )}

        <Link to={`/projects/${project.id}`} className="card-link">
          View details →
        </Link>
      </article>
    ))}
  </div>
)}
      </section>

      <Modal open={modalOpen} title="Create project" onClose={closeModal}>
        <form className="modal-form" onSubmit={handleCreate}>
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Website redesign"
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
          <div className="modal-actions">
            <button className="btn btn-secondary" type="button" onClick={closeModal} disabled={submitting}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
