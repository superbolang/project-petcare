import { prisma } from '@/utils/prisma';
export const dynamic = 'force-dynamic';

export async function DELETE(_, { params }) {
  const deleteFile = await prisma.file.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({ message: 'Delete file success', data: deleteFile }, { status: 200 });
}
