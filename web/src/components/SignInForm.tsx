'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import Input from './Input';
import Submit from './Submit';
import { SigninFormState } from '@/lib/definitions';

interface Props {
  onSignin: (
    state: SigninFormState,
    formData: FormData
  ) => Promise<
    | {
        errors: {
          email?: string[] | undefined;
          password?: string[] | undefined;
        };
        message?: undefined;
      }
    | {
        message: string;
        errors?: undefined;
      }
  >;
}

function SignInForm({ onSignin }: Props) {
  const [state, action] = useFormState(onSignin, undefined);

  return (
    <>
      {state?.errors && (
        <div className='mt-2 w-full bg-red-950 border-[1px] border-red-800 rounded-xl p-2'>
          {Object.keys(state.errors).map((key) => (
            <p key={key} className='text-xs text-red-400'>
              {state.errors[key as keyof SigninFormState]}
            </p>
          ))}
        </div>
      )}
      <form action={action} className='flex flex-col gap-2 mt-5'>
        <Input name='email' type='text' placeholder='Email' fullWidth />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          fullWidth
        />
        <Submit text='Sign In' />
      </form>
    </>
  );
}

export default SignInForm;
