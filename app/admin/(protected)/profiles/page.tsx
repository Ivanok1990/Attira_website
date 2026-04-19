import { supabase } from '@/lib/supabase';

interface ProfileStats {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  wardrobe_count: number;
  outfits_count: number;
  generations_count: number;
}

async function getProfiles(): Promise<ProfileStats[]> {
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, first_name, last_name');
  
  if (!profiles) return [];
  
  const profilesWithCounts = await Promise.all(
    profiles.map(async (profile) => {
      const [wardrobeCount, outfitsCount, generationsCount] = await Promise.all([
        supabase.from('wardrobe_items').select('id', { count: 'exact', head: true }).eq('user_id', profile.id),
        supabase.from('outfits').select('id', { count: 'exact', head: true }).eq('user_id', profile.id),
        supabase.from('outfit_generations').select('id', { count: 'exact', head: true }).eq('user_id', profile.id),
      ]);
      
      return {
        id: profile.id,
        username: profile.username,
        first_name: profile.first_name,
        last_name: profile.last_name,
        wardrobe_count: wardrobeCount.count ?? 0,
        outfits_count: outfitsCount.count ?? 0,
        generations_count: generationsCount.count ?? 0,
      };
    })
  );
  
  return profilesWithCounts;
}

export default async function ProfilesPage() {
  const profiles = await getProfiles();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profiles</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wardrobe</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outfits</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generations</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {profile.first_name} {profile.last_name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {profile.username || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {profile.wardrobe_count}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {profile.outfits_count}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {profile.generations_count}
                </td>
              </tr>
            ))}
            {profiles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                  No profiles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
