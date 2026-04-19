'use client';

import { createContext, useContext, useEffect, useState, createElement } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabaseUrl = typeof window !== 'undefined' 
  ? (window as unknown as { ENV_SUPABASE_URL?: string }).ENV_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  : process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = typeof window !== 'undefined'
  ? (window as unknown as { ENV_SUPABASE_ANON_KEY?: string }).ENV_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabase() {
  if (typeof window === 'undefined') return null;
  return createClient(supabaseUrl || '', supabaseKey || '');
}

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = getSupabase();

  useEffect(() => {
    if (!supabase) return;

    const checkUser = async () => {
      try {
        const { data: { user: sbUser } } = await supabase.auth.getUser();
        
        if (sbUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('user_id', sbUser.id)
            .single();
        
          if (profile?.is_admin) {
            setUser({ id: sbUser.id, email: sbUser.email || '' });
            setIsAdmin(true);
          }
        }
      } catch (e) {
        console.error('Auth check error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkUser();
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: 'Client not initialized' };

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('user_id', data.user.id)
        .single();

      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        return { error: 'Access denied. Admin only.' };
      }

      setUser({ id: data.user.id, email: data.user.email || '' });
      setIsAdmin(true);
      router.push('/admin');
      return { error: null };
    }

    return { error: 'Unknown error' };
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    router.push('/admin/login');
  };

  return createElement(AuthContext.Provider, { value: { user, isAdmin, isLoading, signIn, signOut } }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
