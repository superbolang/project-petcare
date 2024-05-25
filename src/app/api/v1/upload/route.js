import { uploadFile } from '@/lib/uploadFile';
import { prisma } from '@/utils/prisma';

export async function POST(req) {
  // memakai formData untuk menerima file, json hanya bisa menerima string dan number
  const formData = await req.formData();
  const file = formData.get('file');
  const id = formData.get('id');

  // Upload

  await uploadFile({ key: file.name, folder: id, body: file });

  // Insert to or update DB
  await prisma.file.upsert({
    where: {
      id,
    },
    update: {
      key: file.name,
    },
    create: {
      id,
      key: file.name,
    },
  });

  console.log(file);

  return Response.json({ message: 'Good!' });
}
