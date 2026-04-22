import { supabase } from './supabase';

function getCount(res: { count: number | null }): number {
  return res.count ?? 0;
}

export async function getOverviewStats() {
  const [profilesRes, wardrobeRes, outfitsRes, generationsRes, acceptedRes, todayUsersRes, weekUsersRes] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('wardrobe_items').select('id', { count: 'exact', head: true }),
    supabase.from('outfits').select('id', { count: 'exact', head: true }),
    supabase.from('outfit_generations').select('id', { count: 'exact', head: true }),
    supabase.from('outfit_generations').select('id', { count: 'exact', head: true }).eq('accepted', true),
    supabase.from('auth.users').select('id', { count: 'exact', head: true }).gte('last_sign_in_at', new Date().toISOString().split('T')[0]),
    supabase.from('auth.users').select('id', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  const totalGenerations = getCount(generationsRes);
  const acceptedGenerations = getCount(acceptedRes);
  const acceptanceRate = totalGenerations > 0 ? Math.round((acceptedGenerations / totalGenerations) * 100) : 0;

  return {
    totalUsers: getCount(profilesRes),
    totalWardrobe: getCount(wardrobeRes),
    totalOutfits: getCount(outfitsRes),
    totalGenerations,
    acceptedGenerations,
    acceptanceRate,
    activeToday: getCount(todayUsersRes),
    newUsersWeek: getCount(weekUsersRes),
  };
}

export async function getUserTrend(days: number = 30) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from('auth.users')
    .select('created_at')
    .gte('created_at', startDate)
    .order('created_at');
  
  if (!data) return [];
  
  const dailyMap = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    dailyMap.set(date, 0);
  }
  
  data.forEach(user => {
    const date = new Date(user.created_at).toISOString().split('T')[0];
    dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
  });
  
  return Array.from(dailyMap.entries())
    .map(([date, count]) => ({ date, count }))
    .reverse();
}

export async function getUsageTrend(days: number = 14) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from('outfit_generations')
    .select('created_at, accepted')
    .gte('created_at', startDate)
    .order('created_at');
  
  if (!data) return [];
  
  const dailyMap = new Map<string, { total: number; accepted: number }>();
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    dailyMap.set(date, { total: 0, accepted: 0 });
  }
  
  data.forEach(gen => {
    const date = new Date(gen.created_at).toISOString().split('T')[0];
    const current = dailyMap.get(date);
    if (current) {
      current.total++;
      if (gen.accepted) current.accepted++;
      dailyMap.set(date, current);
    }
  });
  
  return Array.from(dailyMap.entries())
    .map(([date, { total, accepted }]) => ({ date, total, accepted, rate: total > 0 ? Math.round((accepted / total) * 100) : 0 }))
    .reverse();
}

export async function getOccasionStats() {
  const { data } = await supabase.from('outfit_generations').select('occasion');
  if (!data) return [];
  
  const counts = new Map<string, number>();
  data.forEach(item => {
    const occasion = item.occasion || 'Not specified';
    counts.set(occasion, (counts.get(occasion) || 0) + 1);
  });
  
  return Array.from(counts.entries())
    .map(([occasion, count]) => ({ occasion, count }))
    .sort((a, b) => b.count - a.count);
}

export interface UserRow {
  id: string;
  user_id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  body_type: string | null;
  preferred_fit: string | null;
  country_code: string | null;
  city: string | null;
  profile_created: string;
  auth_created: string;
  last_sign_in_at: string | null;
  wardrobe_count: number;
  outfits_count: number;
  generations_count: number;
  accepted_count: number;
  likes_received: number;
  status: string;
}

export interface UsersQueryParams {
  page?: number;
  search?: string;
  status?: string;
  bodyType?: string;
  country?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getUsers(params: UsersQueryParams = {}) {
  const { page = 1, sortBy = 'last_sign_in_at', sortOrder = 'desc' } = params;
  
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  const { data: rawProfiles } = await supabase.from('profiles').select('*');
  if (!rawProfiles) return { users: [], total: 0, pages: 0 };

  const { data: authUsers } = await supabase.from('auth.users').select('id, email, last_sign_in_at, created_at');
  const authMap = new Map(authUsers?.map(u => [u.id, u]) || []);

  const { data: wardrobeData } = await supabase.from('wardrobe_items').select('user_id');
  const { data: outfitsData } = await supabase.from('outfits').select('id, user_id');
  const { data: generationsData } = await supabase.from('outfit_generations').select('user_id, accepted');
  const { data: likesData } = await supabase.from('outfit_likes').select('outfit_id');

  const wardrobeCounts = new Map<string, number>();
  const outfitsCounts = new Map<string, number>();
  const generationsCounts = new Map<string, number>();
  const acceptedCounts = new Map<string, number>();
  const likesCounts = new Map<string, number>();

  wardrobeData?.forEach(item => {
    if (item.user_id) wardrobeCounts.set(item.user_id, (wardrobeCounts.get(item.user_id) || 0) + 1);
  });

  outfitsData?.forEach(item => {
    if (item.user_id) outfitsCounts.set(item.user_id, (outfitsCounts.get(item.user_id) || 0) + 1);
  });

  generationsData?.forEach(item => {
    if (item.user_id) {
      generationsCounts.set(item.user_id, (generationsCounts.get(item.user_id) || 0) + 1);
      if (item.accepted) acceptedCounts.set(item.user_id, (acceptedCounts.get(item.user_id) || 0) + 1);
    }
  });

  const userOutfitMap = new Map<string, string>();
  outfitsData?.forEach(o => {
    if (o.id && o.user_id) userOutfitMap.set(o.id, o.user_id);
  });

  likesData?.forEach(like => {
    const outfitUserId = userOutfitMap.get(like.outfit_id);
    if (outfitUserId) {
      likesCounts.set(outfitUserId, (likesCounts.get(outfitUserId) || 0) + 1);
    }
  });

  let users: UserRow[] = rawProfiles.map(profile => {
    const authUser = authMap.get(profile.user_id);
    const lastSignIn = authUser?.last_sign_in_at;
    
    let userStatus = 'active';
    if (lastSignIn) {
      const daysInactive = (Date.now() - new Date(lastSignIn).getTime()) / (1000 * 60 * 60 * 24);
      if (daysInactive > 30) userStatus = 'churned';
      else if (daysInactive > 7) userStatus = 'at_risk';
    }

    return {
      id: profile.id,
      user_id: profile.user_id,
      username: profile.username,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: authUser?.email || '',
      body_type: profile.body_type,
      preferred_fit: profile.preferred_fit,
      country_code: profile.country_code,
      city: profile.city,
      profile_created: profile.created_at || '',
      auth_created: authUser?.created_at || '',
      last_sign_in_at: lastSignIn || null,
      wardrobe_count: wardrobeCounts.get(profile.user_id) || 0,
      outfits_count: outfitsCounts.get(profile.user_id) || 0,
      generations_count: generationsCounts.get(profile.user_id) || 0,
      accepted_count: acceptedCounts.get(profile.user_id) || 0,
      likes_received: likesCounts.get(profile.user_id) || 0,
      status: userStatus,
    };
  });

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    users = users.filter(u => 
      u.email?.toLowerCase().includes(searchLower) ||
      u.first_name?.toLowerCase().includes(searchLower) ||
      u.last_name?.toLowerCase().includes(searchLower) ||
      u.username?.toLowerCase().includes(searchLower)
    );
  }

  if (params.status && params.status !== 'all') {
    users = users.filter(u => u.status === params.status);
  }

  if (params.bodyType) {
    users = users.filter(u => u.body_type === params.bodyType);
  }

  if (params.country) {
    users = users.filter(u => u.country_code === params.country);
  }

  users.sort((a, b) => {
    const aVal = (a as any)[sortBy];
    const bVal = (b as any)[sortBy];
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  const total = users.length;
  const paginatedUsers = users.slice(offset, offset + pageSize);

  return {
    users: paginatedUsers,
    total,
    pages: Math.ceil(total / pageSize),
  };
}

export interface GenerationRow {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  occasion: string | null;
  formality: string | null;
  weather_temperature: number | null;
  weather_condition: string | null;
  confidence: number | null;
  accepted: boolean;
  created_at: string;
}

export interface GenerationsQueryParams {
  page?: number;
  search?: string;
  accepted?: boolean;
  occasion?: string;
  dateStart?: string;
  dateEnd?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getGenerations(params: GenerationsQueryParams = {}) {
  const { page = 1, sortBy = 'created_at', sortOrder = 'desc' } = params;

  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  let query = supabase.from('outfit_generations').select('*');

  if (params.dateStart) query = query.gte('created_at', params.dateStart);
  if (params.dateEnd) query = query.lte('created_at', params.dateEnd + 'T23:59:59');
  if (params.accepted !== undefined) query = query.eq('accepted', params.accepted);
  if (params.occasion) query = query.eq('occasion', params.occasion);

  const { data: rawData } = await query.order(sortBy as any, { ascending: sortOrder === 'asc' });
  if (!rawData) return { generations: [], total: 0, pages: 0 };

  const userIds = [...new Set(rawData.map(d => d.user_id).filter(Boolean))];
  const { data: authUsers } = userIds.length > 0
    ? await supabase.from('auth.users').select('id, email').in('id', userIds)
    : { data: [] };

  const authMap = new Map(authUsers?.map(u => [u.id, u.email || '']) || []);

  let generations: GenerationRow[] = rawData.map(gen => ({
    id: gen.id,
    user_id: gen.user_id || '',
    user_name: authMap.get(gen.user_id)?.split('@')[0] || 'Unknown',
    user_email: authMap.get(gen.user_id) || '',
    occasion: gen.occasion,
    formality: gen.formality,
    weather_temperature: gen.weather_temperature,
    weather_condition: gen.weather_condition,
    confidence: gen.confidence,
    accepted: gen.accepted || false,
    created_at: gen.created_at,
  }));

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    generations = generations.filter(g => 
      g.user_email?.toLowerCase().includes(searchLower) ||
      g.user_name?.toLowerCase().includes(searchLower) ||
      g.occasion?.toLowerCase().includes(searchLower)
    );
  }

  const total = generations.length;
  const paginated = generations.slice(offset, offset + pageSize);

  return { generations: paginated, total, pages: Math.ceil(total / pageSize) };
}

export async function getGenerationsStats() {
  const [totalRes, acceptedRes, categoryData, formalityData] = await Promise.all([
    supabase.from('outfit_generations').select('id', { count: 'exact', head: true }),
    supabase.from('outfit_generations').select('id', { count: 'exact', head: true }).eq('accepted', true),
    supabase.from('outfit_generations').select('occasion, confidence'),
    supabase.from('outfit_generations').select('formality'),
  ]);

  const totalCount = getCount(totalRes);
  const acceptedCount = getCount(acceptedRes);

  const confidences = (categoryData?.data || []).map(r => r.confidence).filter(Boolean);
  const avgConf = confidences.length > 0 ? confidences.reduce((a, b) => a + Number(b), 0) / confidences.length : 0;

  const occCounts = new Map<string, number>();
  (categoryData?.data || []).forEach(r => {
    const occ = r.occasion || 'Not specified';
    occCounts.set(occ, (occCounts.get(occ) || 0) + 1);
  });

  const formCounts = new Map<string, number>();
  (formalityData?.data || []).forEach(r => {
    const form = r.formality || 'Not specified';
    formCounts.set(form, (formCounts.get(form) || 0) + 1);
  });

  return {
    totalGenerations: totalCount,
    acceptedGenerations: acceptedCount,
    acceptanceRate: totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0,
    avgConfidence: Math.round(avgConf * 100) / 100,
    occasionDistribution: Array.from(occCounts.entries()).map(([occasion, count]) => ({ occasion, count })).sort((a, b) => b.count - a.count),
    formalityDistribution: Array.from(formCounts.entries()).map(([formality, count]) => ({ formality, count })).sort((a, b) => b.count - a.count),
  };
}

export interface WardrobeStats {
  total: number;
  pending: number;
  failed: number;
  categoryDistribution: { category: string; count: number }[];
  colorDistribution: { color: string; count: number }[];
  brandDistribution: { brand: string; count: number }[];
}

export async function getWardrobeStats() {
  const [totalRes, pendingRes, failedRes, categoryData, colorData, brandData] = await Promise.all([
    supabase.from('wardrobe_items').select('id', { count: 'exact', head: true }),
    supabase.from('wardrobe_items').select('id', { count: 'exact', head: true }).eq('processing_status', 'pending'),
    supabase.from('wardrobe_items').select('id', { count: 'exact', head: true }).eq('processing_status', 'failed'),
    supabase.from('wardrobe_items').select('category_id'),
    supabase.from('wardrobe_items').select('color'),
    supabase.from('wardrobe_items').select('brand'),
  ]);

  const categoryIds = (categoryData?.data || []).map(r => r.category_id).filter(Boolean);
  const { data: categories } = categoryIds.length > 0
    ? await supabase.from('clothing_categories').select('id, name').in('id', categoryIds)
    : { data: [] };
  
  const categoryMap = new Map((categories || []).map(c => [c.id, c.name]));

  const catCounts = new Map<string, number>();
  (categoryData?.data || []).forEach(r => {
    const cat = categoryMap.get(r.category_id) || 'Uncategorized';
    catCounts.set(cat, (catCounts.get(cat) || 0) + 1);
  });

  const colorCounts = new Map<string, number>();
  (colorData?.data || []).forEach(r => {
    const color = r.color || 'Not specified';
    colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
  });

  const brandCounts = new Map<string, number>();
  (brandData?.data || []).forEach(r => {
    const brand = r.brand || 'No brand';
    brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
  });

  return {
    total: getCount(totalRes),
    pending: getCount(pendingRes),
    failed: getCount(failedRes),
    categoryDistribution: Array.from(catCounts.entries()).map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count).slice(0, 10),
    colorDistribution: Array.from(colorCounts.entries()).map(([color, count]) => ({ color, count })).sort((a, b) => b.count - a.count).slice(0, 10),
    brandDistribution: Array.from(brandCounts.entries()).map(([brand, count]) => ({ brand, count })).sort((a, b) => b.count - a.count).slice(0, 10),
  };
}

export interface OutfitRow {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  occasion: string | null;
  formality: string | null;
  confidence: number | null;
  is_public: boolean;
  created_at: string;
  likes_count: number;
}

export interface OutfitsQueryParams {
  page?: number;
  search?: string;
  visibility?: string;
  occasion?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getOutfits(params: OutfitsQueryParams = {}) {
  const { page = 1, sortBy = 'created_at', sortOrder = 'desc' } = params;

  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  let query = supabase.from('outfits').select('*');
  if (params.visibility) query = query.eq('is_public', params.visibility === 'public');
  if (params.occasion) query = query.eq('occasion', params.occasion);

  const { data: rawData } = await query.order(sortBy as any, { ascending: sortOrder === 'asc' });
  if (!rawData) return { outfits: [], total: 0, pages: 0 };

  const userIds = [...new Set(rawData.map(d => d.user_id).filter(Boolean))];
  const { data: authUsers } = userIds.length > 0
    ? await supabase.from('auth.users').select('id, email').in('id', userIds)
    : { data: [] };

  const authMap = new Map(authUsers?.map(u => [u.id, u.email || '']) || []);
  const { data: likesData } = await supabase.from('outfit_likes').select('outfit_id');

  const likesCountMap = new Map<string, number>();
  likesData?.forEach(like => {
    likesCountMap.set(like.outfit_id, (likesCountMap.get(like.outfit_id) || 0) + 1);
  });

  let outfits: OutfitRow[] = rawData.map(outfit => ({
    id: outfit.id,
    user_id: outfit.user_id || '',
    user_name: authMap.get(outfit.user_id)?.split('@')[0] || 'Unknown',
    user_email: authMap.get(outfit.user_id) || '',
    occasion: outfit.occasion,
    formality: outfit.formality,
    confidence: outfit.confidence,
    is_public: outfit.is_public || false,
    created_at: outfit.created_at,
    likes_count: likesCountMap.get(outfit.id) || 0,
  }));

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    outfits = outfits.filter(o => 
      o.user_email?.toLowerCase().includes(searchLower) ||
      o.user_name?.toLowerCase().includes(searchLower) ||
      o.occasion?.toLowerCase().includes(searchLower)
    );
  }

  const total = outfits.length;
  const paginated = outfits.slice(offset, offset + pageSize);

  return { outfits: paginated, total, pages: Math.ceil(total / pageSize) };
}

export async function getOutfitsStats() {
  const [totalRes, publicRes, likesRes, avgConfData] = await Promise.all([
    supabase.from('outfits').select('id', { count: 'exact', head: true }),
    supabase.from('outfits').select('id', { count: 'exact', head: true }).eq('is_public', true),
    supabase.from('outfit_likes').select('id', { count: 'exact', head: true }),
    supabase.from('outfits').select('confidence'),
  ]);

  const confidences = (avgConfData?.data || []).map(r => r.confidence).filter(Boolean);
  const avgConf = confidences.length > 0 ? confidences.reduce((a, b) => a + Number(b), 0) / confidences.length : 0;

  return {
    totalOutfits: getCount(totalRes),
    publicOutfits: getCount(publicRes),
    totalLikes: getCount(likesRes),
    avgConfidence: Math.round(avgConf * 100) / 100,
  };
}

export async function getTopUsers(limit: number = 10) {
  const { data: profiles } = await supabase.from('profiles').select('*');
  if (!profiles || profiles.length === 0) return [];

  const userIds = profiles.map(p => p.user_id).filter(Boolean);
  const { data: authUsers } = userIds.length > 0
    ? await supabase.from('auth.users').select('id, email, last_sign_in_at').in('id', userIds)
    : { data: [] };

  const authMap = new Map(authUsers?.map(u => [u.id, u]) || []);
  const { data: wardrobeData } = await supabase.from('wardrobe_items').select('user_id');
  const { data: outfitsData } = await supabase.from('outfits').select('id, user_id');
  const { data: generationsData } = await supabase.from('outfit_generations').select('user_id, accepted');
  const { data: likesData } = await supabase.from('outfit_likes').select('outfit_id');

  const outfitUserMap = new Map<string, string>();
  outfitsData?.forEach(o => { if (o.id && o.user_id) outfitUserMap.set(o.id, o.user_id); });

  const likesMap = new Map<string, number>();
  likesData?.forEach(l => {
    const outfitUserId = outfitUserMap.get(l.outfit_id);
    if (outfitUserId) likesMap.set(outfitUserId, (likesMap.get(outfitUserId) || 0) + 1);
  });

  const wardrobeCounts = new Map<string, number>();
  const outfitsCounts = new Map<string, number>();
  const generationsCounts = new Map<string, number>();
  const acceptedCounts = new Map<string, number>();

  wardrobeData?.forEach(item => { if (item.user_id) wardrobeCounts.set(item.user_id, (wardrobeCounts.get(item.user_id) || 0) + 1); });
  outfitsData?.forEach(item => { if (item.user_id) outfitsCounts.set(item.user_id, (outfitsCounts.get(item.user_id) || 0) + 1); });
  generationsData?.forEach(item => {
    if (item.user_id) {
      generationsCounts.set(item.user_id, (generationsCounts.get(item.user_id) || 0) + 1);
      if (item.accepted) acceptedCounts.set(item.user_id, (acceptedCounts.get(item.user_id) || 0) + 1);
    }
  });

  return profiles.map(profile => {
    const authUser = authMap.get(profile.user_id);
    return {
      id: profile.id,
      name: [profile.first_name, profile.last_name].filter(Boolean).join(' ') || authUser?.email?.split('@')[0] || 'Unknown',
      email: authUser?.email || '',
      lastSignIn: authUser?.last_sign_in_at,
      wardrobe: wardrobeCounts.get(profile.user_id) || 0,
      outfits: outfitsCounts.get(profile.user_id) || 0,
      generations: generationsCounts.get(profile.user_id) || 0,
      accepted: acceptedCounts.get(profile.user_id) || 0,
      likes: likesMap.get(profile.user_id) || 0,
    };
  }).sort((a, b) => b.generations - a.generations).slice(0, limit);
}

export interface DailyStats {
  date: string;
  users: number;
  generations: number;
  accepted: number;
}

export async function getDailyStats(days: number = 30): Promise<DailyStats[]> {
  const now = new Date();
  const stats: DailyStats[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const startOfDay = dateStr + 'T00:00:00.000Z';
    const endOfDay = dateStr + 'T23:59:59.999Z';
    
    const [userRes, genRes, accRes] = await Promise.all([
      supabase.from('auth.users').select('id', { count: 'exact', head: true }).gte('created_at', startOfDay).lte('created_at', endOfDay),
      supabase.from('outfit_generations').select('id', { count: 'exact', head: true }).gte('created_at', startOfDay).lte('created_at', endOfDay),
      supabase.from('outfit_generations').select('id', { count: 'exact', head: true }).gte('created_at', startOfDay).lte('created_at', endOfDay).eq('accepted', true),
    ]);
    
    stats.push({ date: dateStr, users: getCount(userRes), generations: getCount(genRes), accepted: getCount(accRes) });
  }
  
  return stats;
}