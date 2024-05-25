import { prisma } from '@/utils/prisma';

export async function GET() {
  // const allFiles = await prisma.image.findMany();
  const allFiles = await prisma.file.findMany({});
  return Response.json({ data: allFiles });
}
