import Image from 'next/image';
import { prisma } from '@/utils/prisma';

export const ImgProfile = ({ id }) => {
  // Dapatkan key dari tabel file

  async function getKey({ id }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/files/${id}`, {
      cache: 'no-store',
    });
    const { data } = await res.json();
  }

  const data = getKey((id = { id }));

  // const getKey = async () => {
  //   const res = await prisma.file.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   return res;
  // };

  // const Key = async () => {
  //   const key = await getKey();
  //   return key;

  // async function getData() {
  //   const key = await prisma.file.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   return Response.json({ data: key });
  // }
  // const data = getData();
  // };
  // const i = Key();

  const publicUrl = 'https://pub-b4d8bce428ce4efaaa2645805a673293.r2.dev/devscale';
  return <Image src={`${publicUrl}/${id}/${data.key}`} width={100} height={100} alt='' />;
};
