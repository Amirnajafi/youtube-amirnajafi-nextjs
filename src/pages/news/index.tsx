import MainLayout from '@/layouts/MainLayout';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {ReactElement, useEffect} from 'react';
const Home = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<number>(0);
  useEffect(() => {
    setSelectedId(Number(router.query.id));
  }, [router.query]);

  const news = [
    {
      id: 1,
      title: 'News 1',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'News 2',
      content: 'Content 2',
    },
    {
      id: 3,
      title: 'News 3',
      content: 'Content 3',
    },
  ];
  const handleClick = (id: number) => {
    router.push(`/news/?id=${id}`, undefined, {shallow: true});
  };
  return (
    <>
      <h2>News</h2>
      <ul>
        {news.map((item) => {
          return (
            <li key={item.id}>
              <Link
                onClickCapture={() => handleClick(item.id)}
                href={`/news/${item.id}`}
                passHref
                style={{
                  backgroundColor: selectedId === item.id ? 'red' : 'white',
                }}
                onClick={() => handleClick(item.id)}
              >
                <span>{item.title}</span>
              </Link>
              {/* <a href={`/news/${item.id}`}>{item.title}</a> */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
