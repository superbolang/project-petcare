'use client';

import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useRouter } from 'next/navigation';
// import { redirect } from 'next/navigation';

export default function Reservation({ isReservation, userid, branchid }) {
  const router = useRouter();

  async function handleCreateOrder(formData) {
    const branch_id = formData.get('branch_id');
    const user_id = formData.get('user_id');
    const pet_name = formData.get('pet_name');
    const num_pet = formData.get('num_pet');
    const pet_type = formData.get('pet_type');
    const service = formData.get('service');
    const start_date = formData.get('start_date');
    const end_date = formData.get('end_date');
    const special_treatment = formData.get('special_treatment');

    await fetch('/api/v1/order', {
      method: 'POST',
      body: JSON.stringify({ branch_id, user_id, pet_name, num_pet, pet_type, service, start_date, end_date, special_treatment }),
    });

    router.push(`/dashboard/myorders/${userid}`);
    router.refresh();
  }

  // const [valueDatePicker, setValueDatePicker] = useState({
  //   startDate: new Date(),
  //   endDate: new Date().setMonth(11),
  // });

  const reservationPackages = [
    {
      id: 1,
      name: 'Basic',
      price: 100000,
      includeService: ['Boarding Accommodations', 'Feeding and Hydration'],
    },
    {
      id: 2,
      name: 'Extra',
      price: 150000,
      includeService: ['Boarding Accommodations', 'Feeding and Hydration', 'Exercise and Playtime'],
    },
    {
      id: 3,
      name: 'Super',
      price: 250000,
      includeService: ['Boarding Accommodations', 'Feeding and Hydration', 'Exercise and Playtime', 'Grooming Services'],
    },
  ];

  const handleValueChangeOnDatePicker = (newValue) => {
    setValueDatePicker(newValue);
  };

  return (
    <div className={'mt-9 ' + (isReservation ? 'visible' : 'hidden')}>
      <h2 className='text-2xl font-bold'>Reservation Form</h2>
      <form action={handleCreateOrder}>
        <input type='hidden' value={userid} name='user_id' />
        <input type='hidden' value={branchid} name='branch_id' />
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>What is your pet name ?</span>
          </div>
          <input name='pet_name' required type='text' placeholder='Type here' className='input input-bordered w-full max-w-xs' />
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>How many is your pet ?</span>
          </div>
          <input name='num_pet' required type='number' min='1' placeholder='Type here' className='input input-bordered w-full max-w-xs' />
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Pick your Pet Type</span>
          </div>
          <select required defaultValue={'Pick one'} name='pet_type' className='select select-bordered'>
            <option disabled>Pick one</option>
            <option value='Dog'>Dog</option>
            <option value='Cat'>Cat</option>
            <option value='Rabbit'>Rabbit</option>
          </select>
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>How are you willing your pet to be treated</span>
          </div>
          <select required defaultValue={'Pick one'} name='service' className='select select-bordered'>
            <option disabled>Pick one</option>
            {reservationPackages.map(function (pack) {
              return (
                <option key={pack.name} value={pack.name}>
                  {pack.name} | IDR {pack.price} | {pack.includeService.join(', ')}
                </option>
              );
            })}
          </select>
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Choose your date</span>
          </div>
          <div className='label'>
            <label className='input input-bordered flex items-center gap-2'>
              Start date
              <input type='date' className='grow' name='start_date' required />
            </label>
          </div>
          <div className='label'>
            <label className='input input-bordered flex items-center gap-2'>
              End date
              <input type='date' className='grow' name='end_date' required />
            </label>
          </div>
          {/* <Datepicker inputClassName='bg-base-100 input input-bordered w-full max-w-xs' primaryColor={'fuchsia'} value={valueDatePicker} onChange={handleValueChangeOnDatePicker} /> */}
        </label>
        <label className='form-control w-full max-w-xs '>
          <div className='label'>
            <span className='label-text'>Special Treatment</span>
          </div>
          <textarea className='textarea textarea-bordered h-24 w-full max-w-xs' name='special_treatment' placeholder='Let us know'></textarea>
        </label>
        <button className='btn btn-active btn-neutral mt-2 w-full max-w-xs'>Book</button>
      </form>
    </div>
  );
}
