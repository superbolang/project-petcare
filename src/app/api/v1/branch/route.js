import { prisma } from '@/utils/prisma';
export const dynamic = 'force-dynamic';
import { nanoid } from 'nanoid';

export async function GET() {
  const allBranch = await prisma.branch.findMany();

  return Response.json({ message: 'Get all branch success', data: allBranch }, { status: 200 });
}

// KODE MBAK MONIK, KONFLIK DENGAN KODE YANG LAIN
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);

//   const city = searchParams.get('city');

//   let allBranch;
//   if (city != '') {
//     allBranch = prisma.branch.findMany({
//       where: {
//         branchCity: {
//           equals: city,
//         },
//       },
//     });
//   } else {
//     allBranch = prisma.branch.findMany();
//   }

//   return Response.json({ message: 'Get all branch success', data: await allBranch }, { status: 200 });
// }

export async function POST(req) {
  const { branchName, branchCity, branchAddress, pets } = await req.json();
  const id = nanoid();

  const createNewBranch = await prisma.branch.create({
    data: {
      id,
      branchName,
      branchCity,
      branchAddress,
      pets,
    },
  });

  return Response.json({ message: 'Create branch successfully', data: createNewBranch }, { status: 201 });
}
