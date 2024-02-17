import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {getUserID} from '@/helper/authentication';
const prisma = new PrismaClient();

export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const {id} = req.query;
    if (id) {
      console.log(id);
      const post = await prisma.post.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!post) {
        return res.json({error: 'Not found'});
      }
      res.json(post);
    } else {
      const posts = await prisma.post.findMany({
        where: {
          published: true,
        },
      });
      res.json(posts);
    }
    res.statusCode = 400;
    res.json({error: 'Bad request'});
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
