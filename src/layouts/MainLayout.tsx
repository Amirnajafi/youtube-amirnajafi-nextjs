import React from 'react';

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: IMainLayoutProps) => {
  const {
    children,
  } = props;

  return (
    <>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
};
export default MainLayout;