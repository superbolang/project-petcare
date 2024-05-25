import Image from 'next/image';
import { DeleteButton } from '@/components/DeleteButton';
import Link from 'next/link';
import ModalUser from '@/components/ModalUser';

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

async function getImage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/files/`, {
    cache: 'no-store',
  });
  const { data } = await res.json();
  // console.log(data);
  return data;
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/user`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  // console.log(data);
  return data;
}

export default async function Page() {
  const data = await getData();
  const images = await getImage();
  let src;
  const publicUrl = 'https://pub-b4d8bce428ce4efaaa2645805a673293.r2.dev/devscale/petapp';

  return (
    <>
      <div className='my-1'>
        <div className='text-sm breadcrumbs ml-3 mb-3'>
          <ul>
            <li>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link href={''}>User List</Link>
            </li>
          </ul>
        </div>
        <div>
          <label htmlFor='add-user' className='btn mb-3'>
            Add User
          </label>
          <ModalUser modalId={'add-user'} />
        </div>
        <div className='overflow-x-auto h-screen sticky'>
          <table className='table table-xs table-pin-rows table-pin-cols'>
            <thead>
              <tr>
                <th></th>
                <td>Image</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Action</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => {
                const item = images.filter((item) => item.id == user.id);
                item.length === 0 ? (src = '/images/photo.jpg') : (src = `${publicUrl}/${item[0].id}/${item[0].key}`);
                // console.log(item);
                // console.log(user.id);

                return (
                  <tr key={user.id}>
                    <td></td>
                    <td>
                      <div className='avatar'>
                        <div className='w-24 mask mask-squircle'>
                          <Image src={src} alt='Movie' width={50} height={50} />
                        </div>
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className='flex flex-row gap-2'>
                      <Link className='btn btn-accent mx-1' href={`/dashboard/users/${user.id}`}>
                        Show
                      </Link>
                      {user.role === 'ADMIN' ? null : (
                        <>
                          {/* <label htmlFor='edit-user' className='btn btn-primary mx-1'> */}
                          <label htmlFor={'edit-user' + user.id} className='btn btn-primary mx-1'>
                            Edit
                          </label>
                          {/* <ModalUser modalId={'edit-user'} isEdit={true} id={user.id} /> */}
                          <ModalUser modalId={'edit-user' + user.id} isEdit={true} id={user.id} />
                          <DeleteButton id={user.id} type={user} />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
