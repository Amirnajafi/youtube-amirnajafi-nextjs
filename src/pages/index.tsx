import MainLayout from '@/layouts/MainLayout';
import {getPosts} from '@/services/posts';
import {HeartIcon, ShareIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {NextPageWithLayout} from './_app';
const Home: NextPageWithLayout<{posts: []}> = ({posts}) => {
  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getPosts()
  //     .then((res) => {
  //       const data = res.data;
  //       setPosts(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="container">
      <ul
        role="list"
        className="divide-y divide-gray-300 w-full max-w-lg mx-auto"
      >
        {posts.map((post: any) => {
          return (
            <li
              key={`${post.id}`}
              className="flex flex-col justify-between  gap-3 py-5"
            >
              {/* head */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3 flex place-items-center">
                  <div className="text-sm font-medium text-gray-800">
                    {post.author.name}
                  </div>
                </div>
              </div>
              {/* body */}
              <div>
                <Link href={`/posts/${post.id}`}>
                  <p className="text-gray-500 text-sm">{post.content}</p>
                </Link>
              </div>
              {/* footer */}
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      title="like"
                    >
                      <HeartIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      title="share"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
Home.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};

// export const getServerSideProps = (async (context: any) => {
//   const res = await getPosts();
//   return {props: {posts: res.data}};
// }) satisfies GetServerSideProps<{posts: []}>;

export const getStaticProps = async (context: any) => {
  const res = await getPosts();
  return {
    props: {posts: res.data},
    revalidate: 20,
  };
};

export default Home;
