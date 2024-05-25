'use client';

import { useState } from 'react';
import Reservation from '@/components/Reservation';
import Image from 'next/image';

export default function BranchDetail({ branch, userid }) {
  const [isReservation, setIsReservation] = useState(false);

  async function handleClick() {
    setIsReservation(true);
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      <Image src='/images/branch.jpg' className='card rounded-box w-[500px] justify-self-center' alt='' width={500} height={500} />
      <div>
        <h1 className='text-2xl font-bold'>{branch[0].branchName}</h1>
        <div className='indicator mt-3'>
          <div className='indicator-item indicator-bottom'>
            <button className='btn btn-primary' onClick={handleClick}>
              Reservation
            </button>
          </div>
          <div className='card border w-[500px] bg-fuchsia-100'>
            <div className='card-body'>
              <h2 className='card-title'>Location : {branch[0].branchCity}</h2>
              <p>Address : {branch[0].branchAddress}</p>
              <p>Type of pet accepted : {branch[0].pets}</p>
            </div>
          </div>
        </div>
        <Reservation isReservation={isReservation} userid={userid} branchid={branch[0].id} />
      </div>
    </div>
  );
}
