// app/admin/_components/MetricCard.tsx
interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  variant?: 'default' | 'warning';
}

export function MetricCard({ 
  label, 
  value, 
  subtitle, 
  icon,
  variant = 'default' 
}: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-4xl font-semibold text-gray-900 mt-3 tracking-tighter">
            {typeof value === 'number' ? value.toLocaleString('es-ES') : value}
          </p>
        </div>
        
        {icon && (
          <div className="text-3xl opacity-80">
            {icon}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-4">
          {subtitle}
        </p>
      )}

      {variant === 'warning' && (
        <div className="mt-4 inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
          <span>⚠️</span> Requiere atención
        </div>
      )}
    </div>
  );
}