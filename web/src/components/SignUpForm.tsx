'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import Input from './Input';
import Submit from './Submit';
import { SignupFormState } from '@/lib/definitions';

interface Props {
  onSignup: (
    state: SignupFormState,
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

function SignUpForm({ onSignup }: Props) {
  const [state, action] = useFormState(onSignup, undefined);

  return (
    <>
      {state?.errors && (
        <div className='mt-2 w-full bg-red-950 border-[1px] border-red-800 rounded-xl p-2'>
          {Object.keys(state.errors).map((key) => (
            <p key={key} className='text-xs text-red-400'>
              {state.errors[key as keyof SignupFormState]}
            </p>
          ))}
        </div>
      )}

      <form action={action} className='flex flex-col gap-2 mt-5'>
        <Input name='name' type='text' placeholder='Name' fullWidth />
        <Input name='email' type='text' placeholder='Email' fullWidth />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          fullWidth
        />
        <Submit text='Sign Up' />
      </form>
    </>
  );
}

export default SignUpForm;
