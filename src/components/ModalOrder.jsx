'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

export default function ModalOrder({ isEdit, modalId }) {
  const router = useRouter();
  const [valueDatePicker, setValueDatePicker] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const reservationPakages = [
    {
      id: 1,
      name: 'Basic',
      price: 50000,
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
      price: 350000,
      includeService: ['Boarding Accommodations', 'Feeding and Hydration', 'Exercise and Playtime', 'Grooming Services'],
    },
  ];

  const handleValueChangeOnDatePicker = (newValue) => {
    setValueDatePicker(newValue);
  };

  async function handleRegisterOrder(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('/api/v1/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log(data);

    router.push('/dashboard/users');
    router.refresh();
  }

  async function handleUpdateOrder(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch(`/api/v1/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log(data);
    router.push('/dashboard/users');
    router.refresh();
  }

  return (
    <div>
      <input type='checkbox' id={modalId} className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box'>
          <h2 className='text-2xl font-bold'>Reservation Form</h2>
          <form action={isEdit ? handleUpdateOrder : handleRegisterOrder}>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>What is your Pet Name?</span>
              </div>
              <input name='pet_name' required type='text' placeholder='Type here' className='input input-bordered w-full' />
            </label>
            <label className='form-control w-full'>
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
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Insert Pet Picture</span>
              </div>
              <input type='file' name='pet_image' required className='file-input file-input-bordered w-full' />
            </label>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='label-text'>Pick your Package</span>
              </div>
              <select required defaultValue={'Pick one'} name='package' className='select select-bordered'>
                <option disabled>Pick one</option>
                {reservationPakages.map(function (pack) {
                  return (
                    <option key={pack.name} value={pack.name}>
                      {pack.name} | IDR {pack.price} | {pack.includeService.join(', ')}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Choose your date</span>
              </div>
              <Datepicker inputClassName='bg-base-100 input input-bordered w-full' primaryColor={'fuchsia'} value={valueDatePicker} onChange={handleValueChangeOnDatePicker} />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Special Treatment</span>
              </div>
              <textarea className='textarea textarea-bordered h-24 w-full' name='special_treatment' placeholder='Let us know'></textarea>
            </label>
            <div className='modal-action'>
              <button className='btn btn-primary'>{isEdit ? 'Update Order' : 'Book'}</button>
              <label htmlFor={modalId} className='btn'>
                Close
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
