import { getOutfits, getOutfitsStats, getTopUsers, OutfitRow } from '@/lib/admin-queries';
import { AdminTable, Column, MetricCard } from '../../_components';

export const dynamic = 'force-dynamic';

function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }) {
  return {
    page: parseInt(Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page || '1', 10),
    search: Array.isArray(searchParams.search) ? searchParams.search[0] : searchParams.search || '',
    visibility: Array.isArray(searchParams.visibility) ? searchParams.visibility[0] : searchParams.visibility || '',
    occasion: Array.isArray(searchParams.occasion) ? searchParams.occasion[0] : searchParams.occasion || '',
    sortBy: Array.isArray(searchParams.sortBy) ? searchParams.sortBy[0] : searchParams.sortBy || 'created_at',
    sortOrder: Array.isArray(searchParams.sortOrder) ? searchParams.sortOrder[0] as 'asc' | 'desc' : (searchParams.sortOrder as 'asc' | 'desc') || 'desc',
  };
}

export default async function OutfitsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const params = parseSearchParams(searchParams);
  const [{ outfits, total, pages }, stats, topUsers] = await Promise.all([
    getOutfits(params),
    getOutfitsStats(),
    getTopUsers(10),
  ]);

  // Map data to match expected column keys for outfits tableType  
  const tableData = outfits.map((o: OutfitRow) => ({
    user_name: o.user_name,
    user_email: o.user_email,
    occasion: o.occasion,
    formality: o.formality,
    confidence: o.confidence,
    is_public: o.is_public,
    likes_count: o.likes_count,
    created_at: o.created_at,
  }));

  const columns: Column[] = [
    { key: 'user', label: 'User', sortable: true },
    { key: 'occasion', label: 'Occasion', sortable: true },
    { key: 'formality', label: 'Formality', sortable: true },
    { key: 'confidence', label: 'Confidence', sortable: true },
    { key: 'visibility', label: 'Visibility', sortable: true },
    { key: 'likes_count', label: 'Likes', sortable: true },
    { key: 'created', label: 'Created', sortable: true },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold pb-36 text-gray-900 mb-6">Outfits & Social</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Outfits" value={stats.totalOutfits} subtitle="Saved by users" />
        <MetricCard label="Public Outfits" value={stats.publicOutfits} subtitle="In feed" />
        <MetricCard label="Total Likes" value={stats.totalLikes} subtitle="Across all outfits" />
        <MetricCard label="Avg Confidence" value={`${stats.avgConfidence}%`} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Users by Activity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topUsers.map((user, idx) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="text-right text-xs">
                <p className="text-gray-900">{user.outfits} outfits</p>
                <p className="text-green-600">{user.likes} likes</p>
              </div>
            </div>
          ))}
          {topUsers.length === 0 && (
            <p className="text-sm text-gray-500 col-span-3 text-center py-4">No users yet</p>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Outfits</h3>
      <AdminTable
        data={tableData}
        columns={columns}
        total={total}
        pages={pages}
        currentPage={params.page}
        searchPlaceholder="Search by user or occasion..."
        searchValue={params.search}
        exportFilename="outfits.csv"
        tableType="outfits"
      />
    </div>
  );
}