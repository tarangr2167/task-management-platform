interface ProgressBarProps {
  value: number;
  label?: string;
}

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-bar">
      <div className="progress-bar__header">
        <span>{label ?? "Completion progress"}</span>
        <strong>{clamped}%</strong>
      </div>
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
