type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-800',
};

function getVariantFromStatus(status: string): BadgeVariant {
  const s = status.toLowerCase();
  if (s === 'active' || s === 'accepted' || s === 'public' || s === 'done') return 'success';
  if (s === 'at risk' || s === 'pending' || s === 'processing') return 'warning';
  if (s === 'canceled' || s === 'failed' || s === 'churned' || s === 'private') return 'error';
  if (s === 'inactive') return 'neutral';
  return 'info';
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const styleVariant = variant || getVariantFromStatus(status);
  
  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${variantStyles[styleVariant]}`}>
      {status}
    </span>
  );
}

export function getUserStatus(lastSignInAt: string | null): { label: string; variant: BadgeVariant } {
  if (!lastSignInAt) return { label: 'Never', variant: 'error' };
  
  const daysInactive = (Date.now() - new Date(lastSignInAt).getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysInactive <= 7) return { label: 'Active', variant: 'success' };
  if (daysInactive <= 30) return { label: 'At Risk', variant: 'warning' };
  return { label: 'Churned', variant: 'error' };
}