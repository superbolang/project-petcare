import { prisma } from '@/utils/prisma';

// export async function GET(req, { params }) {
//   const { id_user, id } = params;
//   const order = await prisma.order.findFirst({
//     where: {
//       user_id: id_user,
//       id: id,
//     },
//   });

//   return Response.json({ message: `Get order with ID ${id} and user ID ${id_user} success`, data: order }, { status: 200 });
// }

export async function GET(_, { params }) {
  const singleOrder = await prisma.order.findFirst({
    where: {
      id: params.id,
    },
  });

  return Response.json({ message: 'Get single order success', data: singleOrder }, { status: 200 });
}

// export async function PUT(req, { params }) {
//   const { id } = params;
//   const jsonData = await req.json();

//   const reqBody = {
//     pet_name: jsonData.pet_name,
//     pet_type: jsonData.pet_type,
//     package: jsonData.package,
//     start_date: jsonData.start_date,
//     end_date: jsonData.end_date,
//     special_treatment: jsonData.special_treatment,
//   };

//   for (const fieldName in reqBody) {
//     if (!reqBody[fieldName]) {
//       return Response.json({ message: `${fieldName} is required` }, { status: 400 });
//     }
//   }

//   try {
//     const updatedOrder = await prisma.order.update({
//       where: { id },
//       data: reqBody,
//     });

//     return Response.json({ message: 'Order updated successfully', data: updatedOrder }, { status: 200 });
//   } catch (error) {
//     return Response.json({ message: 'Database error', error: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//   const { id_user, id } = params;

//   try {
//     await prisma.order.delete({
//       where: {
//         user_id: id_user,
//         id: id,
//       },
//     });

//     return Response.json({ message: 'Order deleted successfully' }, { status: 200 });
//   } catch (error) {
//     return Response.json({ message: 'Database error', error: error.message }, { status: 500 });
//   }
// }

export async function PATCH(request, { params }) {
  const { branch_id, user_id, pet_name, num_pet, pet_type, service, start_date, end_date, special_treatment, price, status, comment } = await request.json();

  const editOrder = await prisma.order.update({
    where: { id: params.id },
    data: {
      branch_id: branch_id,
      user_id: user_id,
      pet_name: pet_name,
      num_pet: num_pet,
      pet_type: pet_type,
      package: service,
      start_date: start_date,
      end_date: end_date,
      special_treatment: special_treatment,
      price: price,
      status: status,
      comment: comment,
    },
  });

  return Response.json({ message: 'Update user success', data: editOrder }, { status: 200 });
}

export async function DELETE(_, { params }) {
  const deleteOrder = await prisma.order.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({ message: 'Delete order success', data: deleteOrder }, { status: 200 });
}
