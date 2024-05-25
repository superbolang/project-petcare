'use client';
import { useRouter } from 'next/navigation';

export const DeleteButton = ({ id, type, userid }) => {
  const router = useRouter();

  async function handleDelete() {
    if (type == 'user') {
      await fetch(`/api/v1/user/${id}`, {
        method: 'DELETE',
      });
      await fetch(`/api/v1/files/${id}`, {
        method: 'DELETE',
      });
      router.push('/dashboard/users');
    } else if (type == 'branch') {
      await fetch(`/api/v1/branch/${id}`, {
        method: 'DELETE',
      });
      router.push(`/dashboard/adminbranch/${userid}`);
    } else if (type == 'order') {
      await fetch(`/api/v1/order/${id}`, {
        method: 'DELETE',
      });
      router.push(`/dashboard`);
    }
    router.refresh();
  }

  return (
    <button className='btn btn-secondary mx-2' onClick={handleDelete}>
      Delete
    </button>
  );
};
