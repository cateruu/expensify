import { signup } from '@/actions/auth';
import SignUpForm from '@/components/SignUpForm';
import Link from 'next/link';

export default function Login() {
  return (
    <main className='h-full flex flex-col justify-center px-10 '>
      <h1 className='text-4xl font-semibold'>Get started now</h1>
      <p className='text-sm text-stone-500'>
        Enter you credentials to access your account
      </p>
      <SignUpForm onSignup={signup} />
      <p className='text-center text-stone-500 text-sm mt-1'>
        Already have an account?{' '}
        <Link href='/sign-in' className='text-green-900'>
          Sign In
        </Link>
      </p>
    </main>
  );
}
