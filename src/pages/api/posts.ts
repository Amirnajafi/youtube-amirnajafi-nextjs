import type {NextApiRequest, NextApiResponse} from 'next';

const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Content 1',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content 2',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'Content 3',
  },
  {
    id: 4,
    title: 'Post 4',
    content: 'Content 4',
  },
];
export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    console.log(req.query);
    const {id} = req.query;
    if (id) {
      const post = posts.find((item) => item.id === Number(id));
      if (!post) {
        return res.json({error: 'Not found'});
      }
      res.json(post);
    } else {
      res.json(posts);
    }
    // res.statusCode = 400;
    // res.json({error: 'Bad request'});
  }
  if (req.method === 'POST') {
    // console.log(req.body);
    let data = posts;
    data = [...data, req.body];
    return res.json(data);
  }
  if (req.method === 'PUT') {
    let input = req.body;
    let data = posts;
    data = data.map((item) => {
      if (item.id === input.id) {
        return input;
      }
      return item;
    });
    return res.json(data);
  }
  if (req.method === 'DELETE') {
    let data = posts.filter((item) => item.id !== req.body.id);
    return res.json(data);
  }
  return res.json({});
}
