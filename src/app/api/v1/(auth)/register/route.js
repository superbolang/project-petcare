import bcrypt from 'bcrypt';
import { prisma } from '@/utils/prisma';

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ message: 'All field must be filled' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createNewUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return Response.json({ message: 'User registered successfully', data: createNewUser }, { status: 201 });
}
