'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

interface AdminTableProps {
  data: Record<string, any>[];
  columns: Column[];
  total: number;
  pages: number;
  currentPage: number;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  exportData?: Record<string, any>[];
  exportFilename?: string;
  emptyMessage?: string;
  tableType?: 'users' | 'generations' | 'outfits';
}

function formatDate(dateStr: string | null): string {
  if (!dateStr || dateStr === '-') return '-';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '-';
  }
}

function formatDaysAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  try {
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  } catch {
    return '-';
  }
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    at_risk: 'bg-yellow-100 text-yellow-800',
    churned: 'bg-red-100 text-red-800',
    saved: 'bg-green-100 text-green-800',
    'not saved': 'bg-yellow-100 text-yellow-800',
    public: 'bg-green-100 text-green-800',
    private: 'bg-gray-100 text-gray-800',
  };
  return styles[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
}

function renderCell(key: string, value: any, row: Record<string, any>, tableType?: string): React.ReactNode {
  // Users table special rendering
  if (tableType === 'users') {
    if (key === 'name') {
      const name = [row.first_name, row.last_name].filter(Boolean).join(' ') || '-';
      return (
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      );
    }
    if (key === 'status') {
      return (
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(value)}`}>
          {value === 'at_risk' ? 'At Risk' : value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      );
    }
    if (key === 'location') {
      return row.city ? `${row.city}${row.country_code ? `, ${row.country_code}` : ''}` : row.country_code || '-';
    }
    if (key === 'joined') {
      return formatDate(row.auth_created);
    }
    if (key === 'last_active') {
      return <p className="text-gray-900">{formatDaysAgo(row.last_sign_in_at)}</p>;
    }
    if (key === 'generations') {
      return (
        <div>
          <p className="font-medium">{row.generations_count}</p>
          {row.accepted_count > 0 && <p className="text-xs text-green-600">{row.accepted_count} saved</p>}
        </div>
      );
    }
  }

  // Generations table special rendering
  if (tableType === 'generations') {
    if (key === 'user') {
      return (
        <div>
          <p className="font-medium text-gray-900">{row.user_name}</p>
          <p className="text-xs text-gray-500">{row.user_email}</p>
        </div>
      );
    }
    if (key === 'weather') {
      return row.weather_temperature ? `${row.weather_temperature}°C, ${row.weather_condition || '-'}` : '-';
    }
    if (key === 'confidence') {
      return row.confidence ? `${Math.round(row.confidence * 100)}%` : '-';
    }
    if (key === 'status') {
      return (
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(row.accepted ? 'saved' : 'not saved')}`}>
          {row.accepted ? 'Saved' : 'Not saved'}
        </span>
      );
    }
    if (key === 'date') {
      return formatDate(row.created_at);
    }
  }

  // Outfits table special rendering
  if (tableType === 'outfits') {
    if (key === 'user') {
      return (
        <div>
          <p className="font-medium text-gray-900">{row.user_name}</p>
          <p className="text-xs text-gray-500">{row.user_email}</p>
        </div>
      );
    }
    if (key === 'confidence') {
      return row.confidence ? `${Math.round(row.confidence * 100)}%` : '-';
    }
    if (key === 'visibility') {
      return (
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(row.is_public ? 'public' : 'private')}`}>
          {row.is_public ? 'Public' : 'Private'}
        </span>
      );
    }
    if (key === 'created') {
      return formatDate(row.created_at);
    }
  }

  // Default rendering
  if (value === null || value === undefined) return '-';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function AdminTable({
  data,
  columns,
  total,
  pages,
  currentPage,
  searchPlaceholder = 'Search...',
  onSearch,
  searchValue,
  exportData,
  exportFilename = 'export.csv',
  emptyMessage = 'No data found',
  tableType,
}: AdminTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchValue || '');
  const [sortKey, setSortKey] = useState(searchParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc');

  useEffect(() => {
    setLocalSearch(searchValue || '');
  }, [searchValue]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/admin?${params.toString()}`);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
      updateParams({ sortBy: key, sortOrder: newOrder });
    } else {
      setSortKey(key);
      setSortOrder('desc');
      updateParams({ sortBy: key, sortOrder: 'desc' });
    }
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  const handleExport = () => {
    const headers = columns.map(c => c.label).join(',');
    const rows = (exportData || data).map(row => 
      columns.map(c => {
        const value = row[c.key];
        if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
        return value ?? '';
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(localSearch);
      updateParams({ search: localSearch, page: '1' });
    }
  };

  const pageSize = 20;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder={searchPlaceholder}
            className="px-3 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {(localSearch || searchValue) && (
            <button
              onClick={() => {
                setLocalSearch('');
                onSearch?.('');
                updateParams({ search: '', page: '1' });
              }}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Clear
            </button>
          )}
        </div>
        <button
          onClick={handleExport}
          className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase ${
                    col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-gray-900">
                      {renderCell(col.key, row[col.key], row, tableType)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {startItem} to {endItem} of {total} results
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, pages) }, (_, i) => {
              let pageNum: number;
              if (pages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= pages - 2) {
                pageNum = pages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1.5 text-sm border rounded ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pages}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}