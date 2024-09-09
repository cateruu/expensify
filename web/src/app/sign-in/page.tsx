import SignInForm from '@/components/SignInForm';
import Link from 'next/link';

export default function Login() {
  return (
    <main className='h-full flex flex-col justify-center px-10 '>
      <h1 className='text-4xl font-semibold'>Welcome!</h1>
      <p className='text-sm text-stone-500'>Sign in to your account</p>
      <SignInForm />
      <p className='text-center text-stone-500 text-sm mt-1'>
        Don&apos;t have an account?{' '}
        <Link href='/sign-up' className='text-green-900'>
          Sign Up
        </Link>
      </p>
    </main>
  );
}
