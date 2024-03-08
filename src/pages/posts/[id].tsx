import MainLayout from '@/layouts/MainLayout';
import {NextPageWithLayout} from '@/pages/_app';
import {getPost, getPosts} from '@/services/posts';
import {HeartIcon, ShareIcon} from '@heroicons/react/24/outline';
import {PrismaClient} from '@prisma/client';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import {ReactElement} from 'react';

const PostPage: NextPageWithLayout<{post: any}> = ({post}) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content} />
      </Head>
      <div className="container">
        <ul
          role="list"
          className="divide-y divide-gray-300 w-full max-w-lg mx-auto"
        >
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
              <p className="text-gray-500 text-sm">{post.content}</p>
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
        </ul>
      </div>
    </>
  );
};
PostPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// export const getServerSideProps = async (context: any) => {
//   const prisma = new PrismaClient();
//   const id = context.params.id;
//   if (id) {
//     const post = await prisma.post.findFirst({
//       where: {
//         id: Number(id),
//       },
//       include: {
//         author: {
//           select: {
//             name: true,
//             id: true,
//           },
//         },
//       },
//     });
//     console.log(post);
//     if (!post) {
//       return {
//         notFound: true,
//       };
//     }
//     return {props: {post: JSON.parse(JSON.stringify(post))}};
//   } else {
//     return {
//       notFound: true,
//     };
//   }
// };

export const getServerSideProps = async (context: any) => {
  const {locale} = context;
  const id = context.params.id;
  const res = await getPost(id, locale);
  // Pass data to  page via props
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      post: res.data,
    },
  };
};

// export const getStaticProps = async (context: any) => {
//   const id = context.params.id;
//   const res = await getPost(id);
//   return {props: {post: res.data}, revalidate: 60 * 5};
// };

// export const getStaticPaths = async () => {
//   const res = await getPosts();
//   const posts = res.data;
//   const paths = posts.map((post: any) => ({
//     params: {id: `${post.id}`},
//   }));
//   return {paths, fallback: 'blocking'};
// };

export default PostPage;
