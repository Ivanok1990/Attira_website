interface BarChartProps {
  data: {
    label: string;
    value: number;
    secondaryValue?: number;
    color?: string;
    secondaryColor?: string;
  }[];
  maxValue?: number;
  height?: number;
  showValues?: boolean;
  stack?: boolean;
}

export function BarChart({ 
  data, 
  maxValue, 
  height = 200,
  showValues = true,
  stack = false
}: BarChartProps) {
  const calculatedMax = maxValue || Math.max(...data.map(d => d.secondaryValue ? Math.max(d.value, d.secondaryValue) : d.value), 1);
  
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex flex-col h-full justify-end gap-1">
        {data.map((item, index) => {
          const barHeight = stack
            ? ((item.value + (item.secondaryValue || 0)) / calculatedMax) * 100
            : (item.value / calculatedMax) * 100;
          
          return (
            <div key={index} className="flex items-center gap-2">
              <span className="w-20 text-xs text-gray-500 truncate text-right flex-shrink-0">
                {item.label}
              </span>
              <div className="flex-1 h-6 bg-gray-100 rounded relative overflow-hidden">
                {stack ? (
                  <>
                    <div 
                      className="h-full absolute left-0 rounded"
                      style={{ 
                        width: `${(item.value / calculatedMax) * 100}%`,
                        backgroundColor: item.color || '#3b82f6'
                      }}
                    />
                    {item.secondaryValue !== undefined && (
                      <div 
                        className="h-full absolute rounded"
                        style={{ 
                          left: `${(item.value / calculatedMax) * 100}%`,
                          width: `${(item.secondaryValue! / calculatedMax) * 100}%`,
                          backgroundColor: item.secondaryColor || '#22c55e'
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div 
                    className="h-full rounded"
                    style={{ 
                      width: `${barHeight}%`,
                      backgroundColor: item.color || '#3b82f6'
                    }}
                  />
                )}
                {showValues && (
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium">
                    {item.secondaryValue !== undefined 
                      ? `${item.value} / ${item.secondaryValue}`
                      : item.value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}