import { prisma } from '@/utils/prisma';

export async function GET(_, { params }) {
  const singleBranch = await prisma.branch.findFirst({
    where: {
      id: params.id,
    },
  });

  return Response.json({ message: 'Get single branch success', data: singleBranch }, { status: 200 });
}

export async function DELETE(_, { params }) {
  const deleteBranch = await prisma.branch.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({ message: 'Delete branch success', data: deleteBranch }, { status: 200 });
}

export async function PATCH(request, { params }) {
  const { branchName, branchCity, branchAddress, pets } = await request.json();

  const editBranch = await prisma.branch.update({
    where: { id: params.id },
    data: { branchName: branchName, branchCity: branchCity, branchAddress: branchAddress, pets: pets },
  });

  return Response.json({ message: 'Update branch success', data: editBranch }, { status: 200 });
}
