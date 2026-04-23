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
  return <>{children}</>;
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