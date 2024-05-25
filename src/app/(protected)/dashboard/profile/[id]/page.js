import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/user`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  // console.log(data);

  return data;
}

async function getImage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/files`, {
    cache: 'no-store',
  });
  const { data } = await res.json();
  // console.log(data);
  return data;
}

export default async function Page({ params }) {
  const users = await getData();
  const images = await getImage();
  const { id } = params;
  const user = users.filter((user) => user.id == id);
  const item = images.filter((item) => item.id == id);
  let src;
  const publicUrl = 'https://pub-b4d8bce428ce4efaaa2645805a673293.r2.dev/devscale/petapp';
  item.length === 0 ? (src = '/images/photo.jpg') : (src = `${publicUrl}/${item[0].id}/${item[0].key}`);

  // console.log(user);
  // console.log(item[0].key);

  async function handleUpdate(formData) {
    'use server';
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, src }),
    });

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/upload`, {
      method: 'POST',
      body: formData,
    });

    redirect(`/dashboard/profile/${id}`);
  }

  return (
    <div>
      <div className='text-sm breadcrumbs ml-2'>
        <ul>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <Link href={''}>Edit Profile</Link>
          </li>
        </ul>
      </div>
      <form className='card-body min-w-sm grid place-content-center' action={handleUpdate}>
        <input type='hidden' name='id' value={id}></input>
        <div className='avatar'>
          <div className='w-24 rounded-full'>
            <Image src={src} width={100} height={100} alt='' />
          </div>
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Name</span>
          </label>
          <input type='text' name='name' defaultValue={user[0].name} className='input input-bordered' required />
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input type='email' name='email' defaultValue={user[0].email} className='input input-bordered' required></input>
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>New Password</span>
          </label>
          <input type='password' name='password' placeholder='Type here' className='input input-bordered' required />
        </div>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Pick your picture</span>
          </div>
          <input type='file' className='file-input file-input-bordered w-full max-w-xs' name='file' />
          <div className='label'></div>
        </label>
        <div className='form-control mt-6'>
          <button className='btn btn-primary'>Update</button>
        </div>
      </form>
    </div>
  );
}
