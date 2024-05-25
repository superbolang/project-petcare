import Image from 'next/image';

async function getImage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/files/`, {
    cache: 'no-store',
  });
  const { data } = await res.json();
  return data;
}

async function getOrder() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/order`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

export default async function Page({ params }) {
  const orders = await getOrder();

  const images = await getImage();
  const { id } = params;
  const dataOrder = orders.filter((order) => order.user_id == id);

  const publicUrl = 'https://pub-b4d8bce428ce4efaaa2645805a673293.r2.dev/devscale/petapp';

  let src;
  const item = images.filter((item) => item.id == id);
  item.length === 0 ? (src = '/images/photo.jpg') : (src = `${publicUrl}/${item[0].id}/${item[0].key}`);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/user/${id}`, {
    cache: 'no-store',
  });
  const { data } = await res.json();
  // console.log(data);

  return (
    <div className='flex flex-col'>
      <div className='basis-1 card card-side bg-base-100 shadow-xl '>
        <figure>
          <Image src={src} alt='Movie' width={300} height={300} />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{data.name}</h2>
          <p>{data.email}</p>
        </div>
      </div>

      {data.role === 'ADMIN' ? null : (
        <>
          <div className='divider basis-1'>Order</div>
          <div className='basis-1'>
            <div className='overflow-x-auto h-screen sticky'>
              <table className='table table-xs table-pin-rows table-pin-cols'>
                <thead>
                  <tr>
                    <th></th>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataOrder.map((order) => {
                    return (
                      <>
                        <tr key={order.id}>
                          <th></th>
                          <td>{order.branch_id}</td>
                          <td>{order.pet_name}</td>
                          <td>{order.num_pet}</td>
                          <td>{order.pet_type}</td>
                          <td>{order.start_date}</td>
                          <td>{order.end_date}</td>
                          <td>{order.package}</td>
                          <td>{order.special_treatment}</td>
                          <td>{order.price}</td>
                          <td>{order.status}</td>
                          <td>{order.comment}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
