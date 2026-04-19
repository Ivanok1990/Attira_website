import { supabase } from '@/lib/supabase';

async function getMetrics() {
  const [profilesCount, wardrobeCount, outfitsCount, generationsCount] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('wardrobe_items').select('id', { count: 'exact', head: true }),
    supabase.from('outfits').select('id', { count: 'exact', head: true }),
    supabase.from('outfit_generations').select('id', { count: 'exact', head: true }),
  ]);
  
  return {
    profiles: profilesCount.count ?? 0,
    wardrobeItems: wardrobeCount.count ?? 0,
    outfits: outfitsCount.count ?? 0,
    generations: generationsCount.count ?? 0,
  };
}

export default async function DashboardPage() {
  const metrics = await getMetrics();
  
  const stats = [
    { label: 'Total Profiles', value: metrics.profiles },
    { label: 'Wardrobe Items', value: metrics.wardrobeItems },
    { label: 'Total Outfits', value: metrics.outfits },
    { label: 'AI Generations', value: metrics.generations },
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
