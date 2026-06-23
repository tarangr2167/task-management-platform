import type { Status } from "../types";

const labels: Record<Status, string> = {
  OPEN: "Open",
  DONE: "Done",
};

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge badge-status badge-status--${status.toLowerCase()}`}>{labels[status]}</span>;
}
