import { type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createProject, deleteProject, getProjects } from "../api/projects";
import EmptyState from "../components/EmptyState";
import type { ProjectListItem } from "../types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
      setName("");
      setDescription("");
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Projects</h1>
          <p className="page-subtitle">Create and manage your project portfolio</p>
        </div>
      </header>

      <section className="panel">
        <h2>New project</h2>
        <form className="form-grid" onSubmit={handleCreate}>
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Website redesign"
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
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create project"}
          </button>
        </form>
      </section>

      {error && <p className="page-message page-message--error">{error}</p>}

      <section className="panel">
        <h2>All projects</h2>
        {loading ? (
          <p className="page-message">Loading projects...</p>
        ) : projects.length === 0 ? (
          <EmptyState title="No projects yet" message="Create your first project above to get started." />
        ) : (
          <div className="card-grid">
            {projects.map((project) => (
              <article key={project.id} className="card">
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
                {project.description && <p className="card-body">{project.description}</p>}
                <Link to={`/projects/${project.id}`} className="card-link">
                  View details →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
