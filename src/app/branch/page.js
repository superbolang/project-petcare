import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <Navbar />
      <div>
        <div className='hero h-[300px]' style={{ backgroundImage: 'url(/images/banner-branch.jpg)' }}>
          <div className='hero-overlay bg-opacity-60'></div>
          <div className='Whero-content text-center'>
            <div className='max-w-md'>
              <h1 className='mb-5 text-5xl font-bold text-base-700'>Search Branch</h1>
              <form className='flex justify-center gap-2'>
                <div className='form-control'>
                  <select name='city' className='select select-bordered w-full max-w-xs'>
                    <option disabled selected>
                      Pick your City
                    </option>
                    <option>Homer</option>
                    <option>Marge</option>
                    <option>Bart</option>
                    <option>Lisa</option>
                    <option>Maggie</option>
                  </select>
                </div>
                <div className='form-control'>
                  <button className='btn btn-primary w-fit'>Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div>
            <div className='text-sm breadcrumbs ml-3'>
              <ul>
                <li>
                  <Link href='/#home'>Home</Link>
                </li>
                <li>
                  <Link href={''}>Branch</Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className='flex flex-wrap gap-4 justify-center p-8'>
              <div className='card card-compact w-96 bg-base-100 shadow-xl'>
                <figure>
                  <Image src='/images/photo.jpg' alt='Shoes' width={100} height={100} />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title'>Branch Name</h2>
                  <p>City</p>
                  <div className='card-actions justify-end'>
                    <Link className='btn btn-primary' href='/branch/branch-slug'>
                      More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
