'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import React from 'react';

export const LogoutButton = () => {
  const router = useRouter();
  function handleLogout() {
    // delete cookie
    Cookies.remove('token');
    router.push('/');
    router.refresh();
  }
  return (
    <button onClick={handleLogout} className='w-fit'>
      Logout
    </button>
  );
};
