import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: IMainLayoutProps) => {
  const {children} = props;

  return (
    <div className="flex flex-col flex-1 h-[100vh]">
      <Header />
      <main className="flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
};
export default MainLayout;
