import Image from 'next/image';
import Link from 'next/link';

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

  // BELUM BERHASIL SEARCH
  // const { city } = searchParams;
  // const req = await fetch(
  //   process.env.NEXT_PUBLIC_BASE_API_URL + '/api/v1/branch?city=' + (city ?? ''),
  //   {
  //     method: 'GET',
  //   },
  //   { cache: 'no-store' }
  // );
  // const { data } = await req.json();

  return (
      <>
        <div>
          <div className='hero h-[300px]' style={{ backgroundImage: 'url(/images/banner-branch.jpg)' }}>
            <div className='hero-overlay bg-opacity-60'></div>
            <div className='Whero-content text-center'>
              <div className='max-w-md'>
                <h1 className='mb-5 text-5xl font-bold text-base-700'>Search Branch</h1>
                {/* <form className='flex justify-center gap-2'>
                <div className='form-control'>
                  <select name='city' defaultValue={city ?? 'Pick your City'} className='select select-bordered w-full max-w-xs'>
                    <option disabled>Pick your City</option>
                    {config.cities.map(function (city, index) {
                      return (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='form-control'>
                  <button className='btn btn-primary w-fit'>Search</button>
                </div>
              </form> */}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            {/* <div>
            <div className='text-sm breadcrumbs ml-3'>
              <ul>
                <li>
                  <Link href='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link href={''}>Branch</Link>
                </li>
              </ul>
            </div>
          </div> */}
            <div>
              <div className='flex flex-wrap gap-4 justify-center p-8'>
                {data.map(function (branch, index) {
                  return (
                      <div key={index} className='card card-compact w-96 bg-base-100 shadow-xl'>
                        <figure>
                          <Image src='/images/branch.jpg' alt='Shoes' width={400} height={400} />
                        </figure>
                        <div className='card-body'>
                          <h2 className='card-title'>{branch.branchName}</h2>
                          <p>{branch.branchCity}</p>
                          <p>{branch.branchAddress}</p>
                          <p>{branch.pets}</p>

                          <div className='card-actions justify-end'>
                            <Link className='btn btn-primary' href='/login'>
                              Log in to view
                            </Link>
                          </div>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
