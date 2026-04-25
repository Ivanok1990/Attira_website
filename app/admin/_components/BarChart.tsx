// app/admin/_components/BarChart.tsx
interface BarChartProps {
  data: {
    label: string;
    value: number;
    secondaryValue?: number;
    color?: string;
    secondaryColor?: string;
  }[];
  height?: number;
  stack?: boolean;
}

export function BarChart({ data, height = 340, stack = false }: BarChartProps) {
  const hasData = data.some(d => d.value > 0 || (d.secondaryValue || 0) > 0);
  const maxValue = hasData 
    ? Math.max(...data.map(d => Math.max(d.value, d.secondaryValue || 0)), 1)
    : 10; // valor mínimo para que se vea algo

  if (!hasData) {
    return (
      <div className="h-[340px] flex items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded-2xl">
        <div className="text-center">
          <p className="text-5xl mb-3">📊</p>
          <p className="font-medium">Sin datos aún</p>
          <p className="text-sm mt-1">Los datos aparecerán cuando los usuarios empiecen a usar la app</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex flex-col h-full justify-end gap-2">
        {data.map((item, index) => {
          const primaryHeight = (item.value / maxValue) * 100;
          const secondaryHeight = item.secondaryValue 
            ? (item.secondaryValue / maxValue) * 100 
            : 0;

          return (
            <div key={index} className="flex items-center gap-3 group">
              <span className="w-16 text-xs text-gray-500 text-right flex-shrink-0">
                {item.label}
              </span>
              <div className="flex-1 h-7 bg-gray-100 rounded-xl relative overflow-hidden">
                {stack ? (
                  <>
                    <div 
                      className="h-full absolute left-0 rounded-xl transition-all"
                      style={{ 
                        width: `${primaryHeight}%`,
                        backgroundColor: item.color || '#3b82f6'
                      }}
                    />
                    {item.secondaryValue && (
                      <div 
                        className="h-full absolute rounded-xl transition-all"
                        style={{ 
                          left: `${primaryHeight}%`,
                          width: `${secondaryHeight}%`,
                          backgroundColor: item.secondaryColor || '#10b981'
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div 
                    className="h-full rounded-xl transition-all"
                    style={{ 
                      width: `${primaryHeight}%`,
                      backgroundColor: item.color || '#3b82f6'
                    }}
                  />
                )}
              </div>
              <div className="w-14 text-right text-xs font-medium text-gray-700">
                {item.value}
                {item.secondaryValue && <span className="text-gray-400">/{item.secondaryValue}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}