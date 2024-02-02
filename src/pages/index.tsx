import MainLayout from '@/layouts/MainLayout';
import {ReactElement, useContext} from 'react';
import {NextPageWithLayout} from './_app';
import {Context} from '@/providers/MainContext';
const Home: NextPageWithLayout<{}> = () => {
  const {user, isLoggedIn} = useContext(Context);
  return (
    <>
      <h2>
        Home welcome <br /> به اپلیکیشن ما خوش آمدید!
      </h2>
      {isLoggedIn && (
        <h2>
          {user.name} : {user.email}{' '}
        </h2>
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
