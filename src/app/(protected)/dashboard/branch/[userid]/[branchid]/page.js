import BranchDetail from '@/components/BranchDetail';
import Link from 'next/link';

async function getBranch() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/branch`, {
    cache: 'no-store',
  });
  const { _, data } = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { userid, branchid } = params;
  const branches = await getBranch();
  const branch = branches.filter((branch) => branch.id == branchid);
  // console.log('Ini data :', data);

  return (
    <div className='m-1'>
      <div className='text-sm breadcrumbs ml-3 mb-3'>
        <ul>
          <li>
            <Link href='/dashboard'>Dashboard</Link>
          </li>
          {/* <li>
            <Link href='/branch'>Branch</Link>
          </li> */}
          <li>
            <Link href={''}>{`${branch[0].branchName}`}</Link>
          </li>
        </ul>
      </div>
      <BranchDetail branch={branch} userid={userid} />
    </div>
  );
}
