'use client';

import { LogoutButton } from '@/components/LogoutButton';
import Link from 'next/link';

export const Navbar = ({ isAdmin, name, children, id }) => {
  return (
    <div>
      <navbar>
        <div className='drawer'>
          <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex flex-col'>
            {/* Navbar */}
            <div className='w-full navbar bg-pink-100 text-indigo-600 fixed top-0 z-50'>
              <div className='flex-none lg:hidden'>
                <label htmlFor='my-drawer-3' aria-label='open sidebar' className='btn btn-square btn-ghost'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-6 h-6 stroke-current'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                  </svg>
                </label>
              </div>
              <div className='flex-1 px-2 mx-2 font-bold text-xl'>
                <Link href='/dashboard'>{name ? `Welcome Back ${name}` : 'Pet Care App'}</Link>
              </div>
              <div className='flex-none hidden lg:block'>
                <ul className='menu menu-horizontal px-1'>
                  {/* Navbar menu content here */}
                  {!name ? (
                    <>
                      <li>
                        <Link href='/#home'>Home</Link>
                      </li>
                      <li>
                        <Link href='/#service-type'>Service</Link>
                      </li>
                      <li>
                        <Link href='/branch'>Branch</Link>
                      </li>
                      <li>
                        <Link href='/#review'>Review</Link>
                      </li>
                      <li>
                        <Link href='/#contact'>Contact</Link>
                      </li>
                      <li>
                        <Link href='/#faq'>FAQ</Link>
                      </li>
                    </>
                  ) : null}

                  {name ? (
                    <>
                      <li>
                        <details>
                          <summary>Dashboard</summary>
                          <ul className='p-2 bg-pink-100 rounded-t-none'>
                            {!isAdmin ? (
                              <>
                                <li>
                                  <Link href={`/dashboard/myorders/${id}`}>My Orders</Link>
                                </li>
                                <li>
                                  <Link href={`/dashboard/branch/${id}`}>Branch</Link>
                                </li>
                              </>
                            ) : null}

                            {isAdmin ? (
                              <>
                                <li>
                                  <Link href='/dashboard/users'>Users</Link>
                                </li>
                                <li>
                                  <Link href='/dashboard/orders'>Orders</Link>
                                </li>
                                <li>
                                <Link href={`/dashboard/adminbranch/${id}`}>Branch</Link>
                                </li>
                              </>
                            ) : null}
                          </ul>
                        </details>
                      </li>
                    </>
                  ) : null}
                  <li>
                    <details>
                      <summary>Account</summary>
                      <ul className='p-2 bg-pink-100 rounded-t-none'>
                        {name ? (
                          <>
                            <li>
                              <Link href={`/dashboard/profile/${id}`}>Profile</Link>
                            </li>
                            <li>
                              <LogoutButton />
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link href='/register'>Register</Link>
                            </li>
                            <li>
                              <Link href='/login'>Login</Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
            {/* Page content here */}
            <div className='mt-14'>{children}</div>
          </div>
        </div>
      </navbar>
    </div>
  );
};
