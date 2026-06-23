interface ProgressBarProps {
  value: number;
  label?: string;
}

// <<<<<<< Updated upstream
// export default function ProgressBar({ value, label }: ProgressBarProps) {
// =======
export default function ProgressBar({ value, label = "Overall completion" }: ProgressBarProps) {
// >>>>>>> Stashed changes
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
