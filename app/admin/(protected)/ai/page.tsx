import { getGenerations, getGenerationsStats, getDailyStats, GenerationRow } from '@/lib/admin-queries';
import { AdminTable, Column, MetricCard } from '../../_components';

export const dynamic = 'force-dynamic';

function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }) {
  const acceptedVal = Array.isArray(searchParams.accepted) ? searchParams.accepted[0] : searchParams.accepted;
  return {
    page: parseInt(Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page || '1', 10),
    search: Array.isArray(searchParams.search) ? searchParams.search[0] : searchParams.search || '',
    accepted: acceptedVal === 'true' ? true : acceptedVal === 'false' ? false : undefined,
    occasion: Array.isArray(searchParams.occasion) ? searchParams.occasion[0] : searchParams.occasion || '',
    dateStart: Array.isArray(searchParams.dateStart) ? searchParams.dateStart[0] : searchParams.dateStart || '',
    dateEnd: Array.isArray(searchParams.dateEnd) ? searchParams.dateEnd[0] : searchParams.dateEnd || '',
    sortBy: Array.isArray(searchParams.sortBy) ? searchParams.sortBy[0] : searchParams.sortBy || 'created_at',
    sortOrder: Array.isArray(searchParams.sortOrder) ? searchParams.sortOrder[0] as 'asc' | 'desc' : (searchParams.sortOrder as 'asc' | 'desc') || 'desc',
  };
}

export default async function AIUsagePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const params = parseSearchParams(searchParams);
  const [{ generations, total, pages }, stats, daily] = await Promise.all([
    getGenerations(params),
    getGenerationsStats(),
    getDailyStats(14),
  ]);

  // Map data to match expected column keys for generations tableType
  const tableData = generations.map((g: GenerationRow) => ({
    user_name: g.user_name,
    user_email: g.user_email,
    occasion: g.occasion,
    formality: g.formality,
    weather_temperature: g.weather_temperature,
    weather_condition: g.weather_condition,
    confidence: g.confidence,
    accepted: g.accepted,
    created_at: g.created_at,
  }));

  const columns: Column[] = [
    { key: 'user', label: 'User', sortable: true },
    { key: 'occasion', label: 'Occasion', sortable: true },
    { key: 'formality', label: 'Formality', sortable: true },
    { key: 'weather', label: 'Weather', sortable: true },
    { key: 'confidence', label: 'Confidence', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
  ];

  const usageTrend = daily.map(d => ({
    label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: d.generations,
    secondaryValue: d.accepted,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Usage Analytics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Generations" value={stats.totalGenerations} />
        <MetricCard label="Accepted" value={stats.acceptedGenerations} subtitle={`${stats.acceptanceRate}% acceptance rate`} />
        <MetricCard label="Avg Confidence" value={`${stats.avgConfidence}%`} />
        <MetricCard label="Avg Acceptance" value={`${stats.acceptanceRate}%`} subtitle="Last 14 days" />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Usage (14 days)</h3>
        <div className="h-40 flex items-end gap-1">
          {usageTrend.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col-reverse h-32">
                <div 
                  className="bg-purple-500 rounded-t"
                  style={{ height: `${(d.value / Math.max(...usageTrend.map(x => x.value), 1)) * 100}%` }}
                  title={`${d.value} generations`}
                />
                <div 
                  className="bg-green-500 rounded-t"
                  style={{ height: d.secondaryValue ? `${(d.secondaryValue / Math.max(d.value, 1)) * 100}%` : 0 }}
                />
              </div>
              <span className="text-[10px] text-gray-500 truncate w-full text-center">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded"></span> Total</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded"></span> Accepted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Occasion Distribution</h3>
          <div className="space-y-2">
            {stats.occasionDistribution.slice(0, 6).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.occasion}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(item.count / stats.totalGenerations) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Formality Distribution</h3>
          <div className="space-y-2">
            {stats.formalityDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.formality}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(item.count / stats.totalGenerations) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Generation History</h3>
      <AdminTable
        data={tableData}
        columns={columns}
        total={total}
        pages={pages}
        currentPage={params.page}
        searchPlaceholder="Search by user or occasion..."
        searchValue={params.search}
        exportFilename="ai-generations.csv"
        tableType="generations"
      />
    </div>
  );
}