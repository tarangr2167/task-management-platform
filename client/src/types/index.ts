export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type Status = "OPEN" | "DONE";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export interface ProjectListItem extends Project {
  _count: { tasks: number };
}

export interface ProjectDetail extends Project {
  tasks: Task[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  priority: Priority;
  status: Status;
  createdAt: string;
  project?: { id: string; name: string };
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export interface CreateTaskInput {
  projectId: string;
  title: string;
  description?: string;
  priority?: Priority;
  status?: Status;
}

export interface TaskFilters {
  projectId?: string;
  status?: Status;
  priority?: Priority;
}
