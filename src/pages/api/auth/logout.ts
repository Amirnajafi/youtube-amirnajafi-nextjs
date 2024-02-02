import type {NextApiRequest, NextApiResponse} from 'next';

export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // logout user
    if (req.method !== 'GET')
      return res.status(405).json({message: 'Method not allowed'});

    // clear the cookie "token"
    res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);
    return res.status(200).json({message: 'user logged out successfully'});
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'});
  }
}
