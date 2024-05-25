'use client';

import AuthComponent from '@/components/AuthComponent';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';

const Register = () => {
  return (
    <>
      <Navbar />
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <AuthComponent isLogin={false} />

          <div className='text-center lg:text-left invisible lg:visible'>
            <Image src='/images/Hero-image.png' className='max-w-[300px] rounded-lg' alt='' width={300} height={300} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
