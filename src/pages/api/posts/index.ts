import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {getUserID} from '@/helper/authentication';
const prisma = new PrismaClient();

export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      console.log('GET request come to /posts');
      const posts = await prisma.post.findMany({
        where: {
          published: true,
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
      res.json(posts);
    } catch (e) {
      console.log(e);
    }
  }
  if (req.method === 'POST') {
    const {title, content, published} = req.body;
    const userId = await getUserID(req.cookies.token);
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId as number,
        published,
      },
    });
    return res.json(post);
  }
  if (req.method === 'PUT') {
    let data = await prisma.post.update({
      where: {
        id: req.body.id,
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      },
    });
    return res.json(data);
  }
  if (req.method === 'DELETE') {
    let data = await prisma.post.delete({
      where: {
        id: req.body.id,
      },
    });
    return res.json(data);
  }
  return res.json({});
}
