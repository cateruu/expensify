'use client';

import { signin } from '@/actions/auth';
import React from 'react';
import { useFormState } from 'react-dom';
import Input from './Input';
import Button from './Button';

function SignInForm() {
  const [state, action] = useFormState(signin, undefined);
  console.log(state);

  return (
    <form action={action} className='flex flex-col gap-2 mt-5'>
      <Input name='email' type='text' placeholder='Email' fullWidth />
      <Input name='password' type='password' placeholder='Password' fullWidth />
      <Button text='Sign In' mt={5} />
    </form>
  );
}

export default SignInForm;
