'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '../_components/AuthProvider';

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  
  const navItems = [
    { href: '/admin', label: 'Overview', icon: '📊' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/ai', label: 'AI Usage', icon: '🤖' },
    { href: '/admin/wardrobe', label: 'Wardrobe', icon: '👕' },
    { href: '/admin/outfits', label: 'Outfits', icon: '✨' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-200 p-4 flex flex-col flex-shrink-0">
        <h1 className="text-lg font-bold mb-6 text-gray-900">Attira Admin</h1>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors font-medium ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2 truncate">{user?.email}</div>
          <button
            onClick={() => signOut()}
            className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left font-medium"
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthCheck>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AuthCheck>
    </AuthProvider>
  );
}