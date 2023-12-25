import MainLayout from '@/layouts/MainLayout';
import {ReactElement, useContext} from 'react';
import {NextPageWithLayout} from './_app';
import {Context} from '@/providers/MainContext';
import Image from 'next/image';
import background from '../../public/test.jpg';
import dynamic from 'next/dynamic';
const GoogleRecaptcha = dynamic(
  () =>
    import('@/components/GoogleRecaptcha').then((mod) => mod.GoogleRecaptcha),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);
// import GoogleRecaptcha from '@/components/GoogleRecaptcha';
const Home: NextPageWithLayout<{}> = () => {
  const {user} = useContext(Context);
  return (
    <>
      <h2>
        Home welcome {user.name} {user.family} <br /> به اپلیکیشن ما خوش آمدید!
      </h2>
      <GoogleRecaptcha />
      <div className="relative w-full h-[600px]">
        <Image
          alt="background"
          src={
            'https://r4.wallpaperflare.com/wallpaper/824/766/324/nebula-4k-teal-turquoise-wallpaper-032b333ddd19ab25df069207c82bc838.jpg'
          }
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAA"
          placeholder="blur"
          priority={true}
          fill={true}
        />
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
