// app/admin/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

export const metadata = {
  title: 'Attira Admin Panel',
  description: 'Panel de administración de Attira',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="es">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${inter.variable} font-sans bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}