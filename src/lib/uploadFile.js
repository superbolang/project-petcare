import { s3Client } from '@/utils/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadFile({ key, folder, body }) {
  // 1. Siapkan file sesuai format yang diminta oleh AWS/R2
  const bytes = await body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 2. Send Command (Command untuk upload file)
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: 'devscale',
        Key: `petapp/${folder}/${key}`,
        ContentType: body.type,
        Body: buffer,
      })
    );
    console.log('Upload OK');
  } catch (error) {
    console.log(error);
  }
}
