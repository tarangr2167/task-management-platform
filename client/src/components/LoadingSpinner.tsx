interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({ label = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status">
      <span className="loading-spinner__ring" />
      <span>{label}</span>
    </div>
  );
}
