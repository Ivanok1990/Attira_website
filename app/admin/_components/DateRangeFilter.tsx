'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface DateRangeFilterProps {
  paramName?: string;
}

export function DateRangeFilter({ paramName = 'dateRange' }: DateRangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const startDate = searchParams.get(`${paramName}_start`) || '';
  const endDate = searchParams.get(`${paramName}_end`) || '';

  const handleApply = (start: string, end: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (start) {
      params.set(`${paramName}_start`, start);
    } else {
      params.delete(`${paramName}_start`);
    }
    if (end) {
      params.set(`${paramName}_end`, end);
    } else {
      params.delete(`${paramName}_end`);
    }
    params.set('page', '1');
    router.push(`/admin?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(`${paramName}_start`);
    params.delete(`${paramName}_end`);
    params.set('page', '1');
    router.push(`/admin?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={startDate}
        onChange={(e) => handleApply(e.target.value, endDate)}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-400">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => handleApply(startDate, e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {(startDate || endDate) && (
        <button
          onClick={handleClear}
          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}