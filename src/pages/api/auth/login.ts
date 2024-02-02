// pages/api/auth/login
import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

interface ILoginBody {
  email: string;
  password: string;
}
export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({message: 'Method not allowed'});

    const data: ILoginBody = req.body;
    if (!data.email || !data.password)
      return res.status(400).json({message: 'please fill all the fields'});

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) return res.status(404).json({message: 'user not found'});
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return res.status(400).json({message: 'password not valid'});

    const tokenData = {
      id: user.id,
    };
    const token = await jwt.sign(tokenData, 'my secret', {
      expiresIn: '1d',
    });
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
    return res.status(200).json({message: 'user logged in successfully'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}
