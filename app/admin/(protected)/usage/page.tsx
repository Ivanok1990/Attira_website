import { supabase } from '@/lib/supabase';

interface UsageStats {
  userId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  totalGenerations: number;
  lastActivity: string | null;
}

async function getUsageStats(): Promise<UsageStats[]> {
  const { data: generations } = await supabase
    .from('outfit_generations')
    .select('user_id, created_at')
    .order('created_at', { ascending: false });
  
  if (!generations || generations.length === 0) return [];
  
  const userMap = new Map<string, { count: number; lastActivity: string }>();
  
  for (const g of generations) {
    const existing = userMap.get(g.user_id);
    const date = g.created_at?.toString() || '';
    if (existing) {
      existing.count++;
      if (!existing.lastActivity || (date && date > existing.lastActivity)) {
        existing.lastActivity = date;
      }
    } else {
      userMap.set(g.user_id, { count: 1, lastActivity: date });
    }
  }
  
  const userIds = Array.from(userMap.keys());
  if (userIds.length === 0) return [];
  
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, first_name, last_name')
    .in('id', userIds);
  
  const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
  
  const result: UsageStats[] = [];
  for (const [userId, stats] of userMap) {
    const profile = profileMap.get(userId);
    result.push({
      userId,
      username: profile?.username || null,
      firstName: profile?.first_name || null,
      lastName: profile?.last_name || null,
      totalGenerations: stats.count,
      lastActivity: stats.lastActivity || null,
    });
  }
  
  return result.sort((a, b) => b.totalGenerations - a.totalGenerations);
}

export default async function UsagePage() {
  const usageStats = await getUsageStats();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Usage</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generations</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usageStats.map((usage) => (
              <tr key={usage.userId} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {usage.firstName} {usage.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {usage.username || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {usage.totalGenerations}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {usage.lastActivity 
                    ? new Date(usage.lastActivity).toLocaleDateString() 
                    : '-'}
                </td>
              </tr>
            ))}
            {usageStats.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                  No usage data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
