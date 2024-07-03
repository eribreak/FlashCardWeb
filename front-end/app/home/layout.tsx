import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/Navbar/NavBar';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen'>
      <NavBar />

      <div className="mt-20 pb-10">{children}</div>

      <Footer />
    </div>
  );
}
