import Image from 'next/image';
import Link from 'next/link';
import ModalOrder from '@/components/ModalOrder';
import { DeleteButton } from '@/components/DeleteButton';

async function getOrder() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/order`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

export default async function Page({ params }) {
  const orders = await getOrder();
  const { userid } = params;
  const data = orders.filter((order) => order.user_id == userid);

  // console.log('Ini data order :', data);

  return (
    <div className='my-1'>
      <div className='text-sm breadcrumbs ml-3 mb-3'>
        <ul>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <Link href={''}>My Order</Link>
          </li>
        </ul>
      </div>

      {/* <div>
        <label htmlFor='book-order' className='btn mb-3'>
          Add Order
        </label>
        <ModalOrder modalId={'book-order'} />
      </div> */}

      {/* <h1 className='ml-3 text-lg '>My Order</h1> */}
      {data.map((order) => {
        return (
          <>
            <div className='card card-side bg-base-100 shadow-xl mt-3'>
              {/* <figure>
          <Image src='/images/photo.jpg' alt='Movie' width={300} height={300} />
        </figure> */}
              <div className='card-body'>
                <ul key={order.id}>
                  <li>Id : {order.id}</li>
                  <li>Pet Name : {order.pet_name}</li>
                  <li>Number of pet : {order.num_pet}</li>
                  <li>Pet Type : {order.pet_type}</li>
                  <li>Service : {order.package}</li>
                  <li>Check In : {order.start_date}</li>
                  <li>Check Out : {order.end_date}</li>
                  <li>
                    Status :<div className='badge badge-accent ml-1'>{order.status}</div>
                  </li>
                  <li>Price : IDR {order.price}</li>

                  {/* <li>
                    Status :<div className='badge badge-neutral ml-1'>Cancel</div>
                    <div className='badge badge-primary ml-1'>On Going</div>
                    <div className='badge badge-secondary ml-1'>On Procces</div>
                    <div className='badge badge-accent ml-1'>Complete</div>
                  </li> */}
                  <li>
                    Special Treatment :{' '}
                    <textarea className='textarea textarea-bordered h-24 w-full' name='special_treatment' placeholder='Let us know' defaultValue={order.special_treatment} disabled></textarea>
                  </li>

                  <li className='flex flex-row gap-2'>
                    <label htmlFor='edit-user' className='btn btn-primary mx-1'>
                      Edit
                    </label>
                    <ModalOrder modalId={'edit-order'} isEdit={true} />
                    <DeleteButton id={order.id} type={'order'} />
                  </li>
                </ul>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
