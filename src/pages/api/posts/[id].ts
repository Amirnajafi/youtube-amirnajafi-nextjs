import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {getUserID} from '@/helper/authentication';
const prisma = new PrismaClient();

export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    console.log('GET request come to /posts/id');
    const {id, locale} = req.query;
    if (id) {
      const post = await prisma.post.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          author: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      if (!post) {
        return res.json({error: 'Not found'});
      }
      if ((locale as String) === 'fa') {
        post.content = post.content_fa;
        post.title = post.title_fa;
      }
      res.json(post);
    }
  }

  return res.json({});
}
