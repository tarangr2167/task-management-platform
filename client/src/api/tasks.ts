import { apiFetch } from "./client";
import type { CreateTaskInput, Task, TaskFilters } from "../types";

function buildQuery(filters: TaskFilters) {
  const params = new URLSearchParams();

  if (filters.projectId) params.set("projectId", filters.projectId);
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getTasks(filters: TaskFilters = {}) {
  return apiFetch<Task[]>(`/tasks${buildQuery(filters)}`);
}

export function createTask(input: CreateTaskInput) {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTask(id: string, input: Partial<CreateTaskInput>) {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteTask(id: string) {
  return apiFetch<void>(`/tasks/${id}`, { method: "DELETE" });
}
