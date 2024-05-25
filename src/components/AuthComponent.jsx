'use client';
import { useRouter } from 'next/navigation';

export default function AuthComponent({ isLogin }) {
  const router = useRouter();

  async function handleLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    router.push('/dashboard');
    router.refresh();
  }

  async function handleRegister(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('/api/v1/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log(data);
    router.push('/login');
  }

  return (
    <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
      <h1 className='text-2xl font-bold text-center mt-5'>{isLogin ? 'Login' : 'Register'} now!</h1>
      <form className='card-body' action={isLogin ? handleLogin : handleRegister}>
        {isLogin ? undefined : (
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input type='text' name='name' placeholder='name' className='input input-bordered' required />
          </div>
        )}

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input type='email' name='email' placeholder='email' className='input input-bordered' required />
        </div>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <input type='password' name='password' placeholder='password' className='input input-bordered' required />
        </div>
        <div className='form-control mt-6'>
          <button className='btn btn-primary'>{isLogin ? 'Login' : 'Register'}</button>
        </div>
      </form>
    </div>
  );
}
