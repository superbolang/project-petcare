// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import Datepicker from 'react-tailwindcss-datepicker';
import { redirect } from 'next/navigation';

async function getOrder() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/order`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

export default async function ModalOrder({ modalId, isEdit, id }) {
  const orders = await getOrder();
  const data = orders.filter((order) => order.id == id);
  // console.log('Ini data modal order :', data[0].id);

  // const router = useRouter();
  // const [valueDatePicker, setValueDatePicker] = useState({
  //   startDate: new Date(),
  //   endDate: new Date().setMonth(11),
  // });

  // const reservationPakages = [
  //   {
  //     id: 1,
  //     name: 'Basic',
  //     price: 50000,
  //     includeService: ['Boarding Accommodations', 'Feeding and Hydration'],
  //   },
  //   {
  //     id: 2,
  //     name: 'Extra',
  //     price: 150000,
  //     includeService: ['Boarding Accommodations', 'Feeding and Hydration', 'Exercise and Playtime'],
  //   },
  //   {
  //     id: 3,
  //     name: 'Super',
  //     price: 350000,
  //     includeService: ['Boarding Accommodations', 'Feeding and Hydration', 'Exercise and Playtime', 'Grooming Services'],
  //   },
  // ];

  // const handleValueChangeOnDatePicker = (newValue) => {
  //   setValueDatePicker(newValue);
  // };

  // async function handleRegisterOrder(formData) {
  //   const name = formData.get('name');
  //   const email = formData.get('email');
  //   const password = formData.get('password');

  //   const res = await fetch('/api/v1/register', {
  //     method: 'POST',
  //     body: JSON.stringify({ name, email, password }),
  //   });
  //   const data = await res.json();
  //   console.log(data);

  //   router.push('/dashboard/users');
  //   router.refresh();
  // }

  async function handleUpdateOrder(formData) {
    'use server';
    const branch_id = formData.get('branch_id');
    const user_id = formData.get('user_id');
    const pet_name = formData.get('pet_name');
    const num_pet = formData.get('num_pet');
    const pet_type = formData.get('pet_type');
    const service = formData.get('service');
    const start_date = formData.get('start_date');
    const end_date = formData.get('end_date');
    const special_treatment = formData.get('special_treatment');
    const price = formData.get('price');
    const status = formData.get('status');
    const comment = formData.get('comment');

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/order/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ branch_id, user_id, pet_name, num_pet, pet_type, service, start_date, end_date, special_treatment, price, status, comment }),
    });

    redirect('/dashboard/orders');
    // router.refresh();
  }

  return (
    <div>
      <input type='checkbox' id={modalId} className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box'>
          <h2 className='text-2xl font-bold'>Reservation Form</h2>
          <form action={isEdit ? handleUpdateOrder : handleRegisterOrder}>
            <input type='hidden' value={data[0].user_id} name='user_id' />
            <input type='hidden' value={data[0].branch_id} name='branch_id' />
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Pet name</span>
              </div>
              <input name='pet_name' required type='text' defaultValue={data[0]?.pet_name} className='input input-bordered w-full' disabled />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Number of pet</span>
              </div>
              <input name='num_pet' required type='text' defaultValue={data[0]?.num_pet} className='input input-bordered w-full' disabled />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Pet type</span>
              </div>
              <input name='pet_type' required type='text' defaultValue={data[0]?.pet_type} className='input input-bordered w-full' disabled />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Package service</span>
              </div>
              <input name='service' required type='text' defaultValue={data[0]?.package} className='input input-bordered w-full' disabled />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Start date</span>
              </div>
              <input name='start_date' required type='text' defaultValue={data[0]?.start_date} className='input input-bordered w-full' disabled />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>End date</span>
              </div>
              <input name='end_date' required type='text' defaultValue={data[0]?.end_date} className='input input-bordered w-full' disabled />
            </label>

            {/* <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Choose your date</span>
              </div>
              <Datepicker inputClassName='bg-base-100 input input-bordered w-full' primaryColor={'fuchsia'} value={valueDatePicker} onChange={handleValueChangeOnDatePicker} />
            </label> */}
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Special Treatment</span>
              </div>
              <textarea className='textarea textarea-bordered h-24 w-full' name='special_treatment' placeholder='Let us know' defaultValue={data[0]?.special_treatment} disabled></textarea>
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Price</span>
              </div>
              <input name='price' required type='text' className='input input-bordered w-full' />
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Status</span>
              </div>
              <select required defaultValue={data[0]?.status} name='status' className='select select-bordered'>
                <option disabled>Pick one</option>
                <option value='Waiting'>Waiting</option>
                <option value='Approved'>Approved</option>
                <option value='Rejected'>Rejected</option>
              </select>
            </label>
            <input type='hidden' name='comment' defaultValue={''} />
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
