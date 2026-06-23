import type { Priority } from "../types";

const labels: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

interface PriorityBadgeProps {
  priority: Priority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <span className={`badge badge-priority badge-priority--${priority.toLowerCase()}`}>{labels[priority]}</span>;
}
