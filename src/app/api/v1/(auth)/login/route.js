import bcrypt from 'bcrypt';
import { prisma } from '@/utils/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  // 1. Cari data yang memiliki associated email

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return Response.json({ message: 'Account not found' });
  }

  // 2. Compare password

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return Response.json({ message: 'Password invalid' });
  }

  // 3. Create token

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const generatedToken = jwt.sign(payload, 'thisissecretkey', { expiresIn: '1d' });

  return new Response(JSON.stringify({ message: 'Login success' }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=${generatedToken};path=/`,
    },
  });
}
