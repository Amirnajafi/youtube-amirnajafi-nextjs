import {PrismaClient} from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next';
import jwt from 'jsonwebtoken';
import {decodeToken} from '@/helper/authentication';

const prisma = new PrismaClient();

export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET')
      return res.status(405).json({message: 'Method not allowed'});

    // get token from cookie
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({message: 'Authorization required'});

    const decodedToken = await decodeToken(token);
    if (!decodedToken)
      return res.status(401).json({message: 'Authorization required'});

    const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });
    return res.status(200).json({data: user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}
