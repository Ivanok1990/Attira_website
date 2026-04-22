import { getOverviewStats, getDailyStats, getOccasionStats, getTopUsers } from '@/lib/admin-queries';
import { MetricCard } from '../_components/MetricCard';
import { BarChart } from '../_components/BarChart';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [overview, daily, occasions, topUsers] = await Promise.all([
    getOverviewStats(),
    getDailyStats(30),
    getOccasionStats(),
    getTopUsers(5),
  ]);
  return { overview, daily, occasions, topUsers };
}

export default async function DashboardPage() {
  const { overview, daily, occasions, topUsers } = await getStats();

  const userTrend = daily.map(d => ({
    label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: d.users,
    secondaryValue: d.generations,
    color: '#3b82f6',
    secondaryColor: '#22c55e',
  }));

  const usageTrend = daily.map(d => ({
    label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: d.generations,
    secondaryValue: d.accepted,
    color: '#8b5cf6',
    secondaryColor: '#22c55e',
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Users" value={overview.totalUsers} subtitle="Active accounts" />
        <MetricCard label="Wardrobe Items" value={overview.totalWardrobe} subtitle="In closets" />
        <MetricCard label="Saved Outfits" value={overview.totalOutfits} subtitle="Created by users" />
        <MetricCard label="AI Generations" value={overview.totalGenerations} subtitle={`${overview.acceptanceRate}% accepted`} />
        <MetricCard label="Active Today" value={overview.activeToday} subtitle="Signed in today" />
        <MetricCard label="New This Week" value={overview.newUsersWeek} subtitle="Joined last 7 days" />
        <MetricCard label="Accepted Outfits" value={overview.acceptedGenerations} subtitle="Saved to closet" />
        <MetricCard label="Pending Review" value={overview.totalGenerations - overview.acceptedGenerations} subtitle="Not yet saved" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Users (30 days)</h3>
          <BarChart data={userTrend} height={180} stack />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Usage (30 days)</h3>
          <BarChart data={usageTrend} height={180} stack />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Occasions</h3>
          <BarChart 
            data={occasions.slice(0, 8).map(o => ({
              label: o.occasion,
              value: o.count,
              color: '#6366f1',
            }))} 
            height={200}
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Users</h3>
          <div className="space-y-3">
            {topUsers.map((user, idx) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.generations} gen{user.accepted > 0 && ` (${user.accepted} saved)`}</p>
                  <p className="text-xs text-gray-500">{user.wardrobe} items</p>
                </div>
              </div>
            ))}
            {topUsers.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No users yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}