'use client';

import { useRouter } from 'next/navigation';

export const FormUpload = ({ id }) => {
  const router = useRouter();
  async function handleUpload(formData) {
    const res = await fetch(`/api/v1/files`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log(data);

    router.refresh();
  }
  return (
    <div>
      <form action={handleUpload}>
        <input type='hidden' name='id' value={id}></input>
        <input name='file' type='file' className='border p-2 rounded mx-2' />
        <button className='bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>Upload</button>
      </form>
    </div>
  );
};
