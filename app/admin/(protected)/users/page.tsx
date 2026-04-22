import { getUsers } from '@/lib/admin-queries';
import { AdminTable, Column } from '../../_components';

export const dynamic = 'force-dynamic';

function parseSearchParams(searchParams: { [key: string]: string | string[] | undefined }) {
  return {
    page: parseInt(Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page || '1', 10),
    search: Array.isArray(searchParams.search) ? searchParams.search[0] : searchParams.search || '',
    status: Array.isArray(searchParams.status) ? searchParams.status[0] : searchParams.status || '',
    sortBy: Array.isArray(searchParams.sortBy) ? searchParams.sortBy[0] : searchParams.sortBy || 'last_sign_in_at',
    sortOrder: Array.isArray(searchParams.sortOrder) ? searchParams.sortOrder[0] as 'asc' | 'desc' : (searchParams.sortOrder as 'asc' | 'desc') || 'desc',
  };
}

export default async function UsersPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const params = parseSearchParams(searchParams);
  const { users, total, pages } = await getUsers(params);

  const columns: Column[] = [
    { key: 'name', label: 'User', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'body_type', label: 'Body Type', sortable: true },
    { key: 'preferred_fit', label: 'Fit', sortable: true },
    { key: 'city', label: 'Location', sortable: true },
    { key: 'auth_created', label: 'Joined', sortable: true },
    { key: 'last_sign_in_at', label: 'Last Active', sortable: true },
    { key: 'wardrobe_count', label: 'Wardrobe', sortable: true },
    { key: 'outfits_count', label: 'Outfits', sortable: true },
    { key: 'generations_count', label: 'Generations', sortable: true },
    { key: 'likes_received', label: 'Likes', sortable: true },
  ];

  return (
    <div >
      <h2 className="text-2xl font-bold  text-gray-900  pb-32">Users CRM</h2>
      <AdminTable
        data={users}
        columns={columns}
        total={total}
        pages={pages}
        currentPage={params.page}
        searchPlaceholder="Search by name or email..."
        searchValue={params.search}
        exportFilename="users.csv"
        tableType="users"
      />
    </div>
  );
}