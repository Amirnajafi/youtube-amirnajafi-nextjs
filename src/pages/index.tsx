import MainLayout from '@/layouts/MainLayout';
import {ReactElement, useContext} from 'react';
import {NextPageWithLayout} from './_app';
import {Context} from '@/providers/MainContext';

const Home: NextPageWithLayout = () => {
  const {user} = useContext(Context);
  return (
    <h2>
      Home welcome {user.name} {user.family}
    </h2>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
