import { apiFetch } from "./client";
import type {
  CreateProjectInput,
  DashboardStats,
  Project,
  ProjectDetail,
  ProjectListItem,
} from "../types";

export function getDashboardStats() {
  return apiFetch<DashboardStats>("/dashboard/stats");
}

export function getProjects() {
  return apiFetch<ProjectListItem[]>("/projects");
}

export function getProject(id: string) {
  return apiFetch<ProjectDetail>(`/projects/${id}`);
}

export function createProject(input: CreateProjectInput) {
  return apiFetch<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProject(id: string, input: Partial<CreateProjectInput>) {
  return apiFetch<Project>(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteProject(id: string) {
  return apiFetch<void>(`/projects/${id}`, { method: "DELETE" });
}
