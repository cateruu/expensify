import { createSession, Tokens } from '@/app/lib/session';
import {
  SigninFormSchema,
  SigninFormState,
  SignunFormSchema,
} from '@/lib/definitions';
import { redirect } from 'next/navigation';

export async function signin(state: SigninFormState, formData: FormData) {
  'use server';
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return {
      message: 'An error occured while logging to your account',
    };
  }

  const tokens = (await res.json()) as Tokens;
  await createSession(tokens);

  redirect('/');
}

export async function signup(state: SigninFormState, formData: FormData) {
  'use server';
  const validatedFields = SignunFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users/register`, {
    method: 'POST',
    body: JSON.stringify({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return {
      message: 'An error occured while creating your account.',
    };
  }

  const resLogin = await fetch(`${process.env.NEXT_PUBLIC_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!resLogin.ok) {
    return {
      message: 'An error occured while creating your account.',
    };
  }

  const tokens = (await resLogin.json()) as Tokens;
  await createSession(tokens);

  redirect('/');
}
