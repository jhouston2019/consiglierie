interface MetricCardProps {
  label: string;
  value: number;
  description?: string;
}

export function MetricCard({ label, value, description }: MetricCardProps) {
  const getColor = (val: number) => {
    if (val >= 80) return 'text-red-400';
    if (val >= 60) return 'text-yellow-400';
    if (val >= 40) return 'text-blue-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-primary border border-border rounded p-6">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className={`text-3xl font-bold ${getColor(value)}`}>
        {value.toFixed(1)}
      </div>
      {description && (
        <div className="text-xs text-gray-600 mt-2">{description}</div>
      )}
    </div>
  );
}
