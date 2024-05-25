import { DeleteButton } from '@/components/DeleteButton';
import ModalOrder from '@/components/ModalOrder';
import Image from 'next/image';
import Link from 'next/link';

async function getOrder() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/order`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

async function getUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/user`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

async function getBranch() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/branch`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

export default async function Page() {
  const orders = await getOrder();
  const users = await getUser();
  const branches = await getBranch();
  return (
    <div className='my-1'>
      <div className='text-sm breadcrumbs ml-3 mb-3'>
        <ul>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <Link href={''}>Order List</Link>
          </li>
        </ul>
      </div>
      {/* <div>
        <label htmlFor='book-order' className='btn mb-3'>
          Add Order
        </label>
        <ModalOrder modalId={'book-order'} />
      </div> */}
      <div className='overflow-x-auto h-screen sticky'>
        <table className='table table-xs table-pin-rows table-pin-cols'>
          <thead>
            <tr>
              <th></th>
              <td>Pet Owner</td>
              <td>Service Branch</td>
              <td>Pet Name</td>
              <td>Number of pet</td>
              <td>Pet type</td>
              <td>Check In</td>
              <td>Check Out</td>
              <td>Package</td>
              <td>Special Treatment</td>
              <td>Price</td>
              <td>Status</td>
              <td>Comment</td>
              <td>Action</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              // const user = users.filter((item) => item.id == order.user_id);
              // console.log('ini user : ', user);

              return (
                <>
                  <tr key={order.id}>
                    <th></th>
                    <td>{order.user_id}</td>
                    <td>{order.branch_id}</td>
                    <td>{order.pet_name}</td>
                    <td>{order.num_pet}</td>
                    <td>{order.pet_type}</td>
                    <td>{order.end_date}</td>
                    <td>{order.end_date}</td>
                    <td>{order.package}</td>
                    <td>{order.special_treatment}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                    <td>{order.comment}</td>
                    {/* <td>
                      <select className='select select-bordered w-full max-w-xs'>
                        <option disabled selected>
                          Order Status
                        </option>
                        <option>On Process</option>
                        <option>On Going</option>
                        <option>Complete</option>
                        <option>Cancel</option>
                      </select>
                    </td> */}
                    <td className='flex flex-row gap-2'>
                      <label htmlFor={'edit-order' + order.id} className='btn btn-primary mx-1'>
                        Edit
                      </label>
                      <ModalOrder modalId={'edit-order' + order.id} isEdit={true} id={order.id} />
                      <DeleteButton id={order.id} type={'order'} />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
