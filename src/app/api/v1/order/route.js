import { prisma } from '@/utils/prisma';
import { nanoid } from 'nanoid';

// export async function GET(req, { params }) {
//   const { id_user } = params;
//   const order = await prisma.order.findMany({
//     where: {
//       user_id: id_user,
//     },
//   });

//   return Response.json({ message: `Get order with ID User ${id_user} success`, data: order }, { status: 200 });
// }

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);

//   const userid = searchParams.get('id');

//   let allOrder;
//   if (userid !== '') {
//     allOrder = prisma.order.findMany({
//       where: {
//         user_id: {
//           equals: userid,
//         },
//       },
//     });
//   } else {
//     allOrder = prisma.order.findMany();
//   }

//   return Response.json({ message: 'Get all branch success', data: await allOrder }, { status: 200 });
// }

export async function GET() {
  const allOrder = await prisma.order.findMany();

  return Response.json({ message: 'Get all order success', data: allOrder }, { status: 200 });
}

export async function POST(req) {
  const id = nanoid();
  const { branch_id, user_id, pet_name, num_pet, pet_type, service, start_date, end_date, special_treatment } = await req.json();
  const sDate = String(new Date(start_date));
  const eDate = String(new Date(end_date));

  // const reqBody = {
  //   branch_id: formData.get('branch_id'),
  //   user_id: formData.get('user_id'),
  //   pet_name: formData.get('pet_name'),
  //   num_pet: formData.get('num_pet'),
  //   pet_type: formData.get('pet_type'),
  //   service: formData.get('service'),
  //   start_date: formData.get('start_date'),
  //   end_date: formData.get('end_date'),
  //   special_treatment: formData.get('special_treatment'),
  // };

  // for (const fieldName in reqBody) {
  //   if (!reqBody[fieldName]) {
  //     return Response.json({ message: `${fieldName} is required` }, { status: 400 });
  //   }
  // }

  // const branch = await prisma.branch.findFirst({
  //   where: {
  //     id: branch_id,
  //   },
  // });
  // if (!branch) return Response.json({ message: 'Branch not found' }, { status: 400 });

  // try {
  //   const newOrder = await prisma.order.create({
  //     data: {
  //       id,
  //       branch_id,
  //       user_id,
  //       pet_name,
  //       num_pet,
  //       pet_type,
  //       service,
  //       start_date,
  //       end_date,
  //       special_treatment,
  //     },
  //   });

  //   return Response.json({ message: 'Order created successfully', data: newOrder }, { status: 201 });
  // } catch (error) {
  //   return Response.json({ message: 'Database error', error: error.message }, { status: 500 });
  // }

  const newOrder = await prisma.order.create({
    data: {
      id,
      branch_id,
      user_id,
      pet_name,
      num_pet,
      pet_type,
      package: service,
      start_date: sDate,
      end_date: eDate,
      special_treatment,
    },
  });

  return Response.json({ message: 'Order created successfully', data: newOrder }, { status: 201 });
}
