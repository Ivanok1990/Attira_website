'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
        <div className="text-gray-500">Loading...</div>
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
  
  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/profiles', label: 'Profiles' },
    { href: '/admin/subscriptions', label: 'Subscriptions' },
    { href: '/admin/usage', label: 'AI Usage' },
  ];
  
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
        <h1 className="text-lg font-semibold mb-6 text-gray-900">Admin</h1>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                item.href === '/admin'
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2 truncate">{user?.email}</div>
          <button
            onClick={() => signOut()}
            className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-white">
        {children}
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
