import Image from 'next/image';
import Link from 'next/link';
import ModalBranch from '@/components/ModalBranch';
import { DeleteButton } from '@/components/DeleteButton';

// Page.getInitialProps = ({ query: { id } }) => {
//   return { id };
// };

async function getBranch() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/branch`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

export default async function Page({ params }) {
  const data = await getBranch();
  const { userid } = params;
  const config = {
    cities: ['Jakarta', 'Surabaya', 'Semarang'],
    pets: ['Dog, Cat, Rabbit', 'Dog, Rabbit', 'Dog, Cat', 'Rabbit, Cat', 'Dog', 'Cat', 'Rabbit'],
  };

  return (
    <div className='my-1'>
      <div className='text-sm breadcrumbs ml-3 mb-3'>
        <ul>
          <li>
            <Link href='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link href={''}>Branch List</Link>
          </li>
        </ul>
      </div>
      <div>
        <label htmlFor='add-branch' className='btn mb-3'>
          Add Branch
        </label>
        <ModalBranch modalId={'add-branch'} config={config} userid={userid} />
      </div>
      <div className='overflow-x-auto h-screen sticky'>
        <table className='table table-xs table-pin-rows table-pin-cols'>
          <thead>
            <tr>
              <th></th>
              <td>Branch Name</td>
              <td>City</td>
              <td>Address</td>
              <td>Type of pets</td>
              <td>Action</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((branch) => {
              return (
                <tr key={branch.id}>
                  <th></th>
                  <td>{branch.branchName}</td>
                  <td>{branch.branchCity}</td>
                  <td>{branch.branchAddress}</td>
                  <td>{branch.pets}</td>
                  <td className='flex flex-row gap-2'>
                    <Link href={`/dashboard/branch/${userid}/${branch.id}`} className='btn btn-accent mx-1'>
                      Show
                    </Link>
                    <label htmlFor={'edit-branch' + branch.id} className='btn btn-primary mx-1'>
                      Edit
                    </label>
                    <ModalBranch modalId={'edit-branch' + branch.id} branch={branch.id} isEdit={true} config={config} />
                    <DeleteButton id={branch.id} type={'branch'} userid={userid} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
