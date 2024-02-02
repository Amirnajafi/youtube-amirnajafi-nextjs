import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface IRegisterBody {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export default async function usersServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({message: 'Method not allowed'});

    const data: IRegisterBody = req.body;
    if (!data.email || !data.password || !data.name) {
      return res.status(400).json({message: 'please fill all the fields'});
    }
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) return res.status(400).json({message: 'user already exists'});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone || '',
      },
    });
    return res
      .status(201)
      .json({message: 'user created successfully', user: newUser});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}
