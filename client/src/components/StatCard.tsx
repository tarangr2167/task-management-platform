import { useCountUp } from "../hooks/useCountUp";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "blue" | "green" | "amber" | "violet";
  icon?: string;
  delay?: number;
  animate?: boolean;
}

export default function StatCard({
  label,
  value,
  hint,
  accent = "blue",
  icon,
  delay = 0,
  animate = false,
}: StatCardProps) {
  const numericTarget = typeof value === "number" ? value : null;
  const animatedNumber = useCountUp(numericTarget ?? 0);
  const displayValue =
    animate && numericTarget !== null ? animatedNumber : value;

  return (
    <article
      className={`stat-card stat-card--${accent}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stat-card__top">
        {icon && <span className="stat-card__icon">{icon}</span>}
        <p className="stat-label">{label}</p>
      </div>
      <p className="stat-value">{displayValue}</p>
      {hint && <p className="stat-hint">{hint}</p>}
    </article>
  );
}
