"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function HeaderAndFooterWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <Header />}
      {children}
      {!isAdminPath && <Footer />}
    </>
  );
}
