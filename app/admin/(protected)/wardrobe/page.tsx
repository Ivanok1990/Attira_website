import { getWardrobeStats } from '@/lib/admin-queries';
import { MetricCard, BarChart } from '../../_components';

export const dynamic = 'force-dynamic';

export default async function WardrobePage() {
  const stats = await getWardrobeStats();

  const categoryData = stats.categoryDistribution.slice(0, 10).map(c => ({
    label: c.category,
    value: c.count,
    color: '#ec4899',
  }));

  const colorData = stats.colorDistribution.slice(0, 10).map(c => ({
    label: c.color,
    value: c.count,
    color: '#14b8a6',
  }));

  const brandData = stats.brandDistribution.slice(0, 10).map(b => ({
    label: b.brand,
    value: b.count,
    color: '#f59e0b',
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Wardrobe Analytics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Items" value={stats.total} subtitle="In all closets" />
        <MetricCard label="Processing Pending" value={stats.pending} subtitle="Awaiting AI" />
        <MetricCard label="Processing Failed" value={stats.failed} subtitle="Needs retry" />
        <MetricCard label="Completed" value={stats.total - stats.pending - stats.failed} subtitle="Processed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <BarChart data={categoryData} height={250} />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>
          <BarChart data={colorData} height={250} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Brands</h3>
        <BarChart data={brandData} height={250} />
      </div>
    </div>
  );
}