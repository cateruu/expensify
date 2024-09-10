import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from './Button';

interface Props {
  text: string;
}

function Submit({ text }: Props) {
  const { pending } = useFormStatus();

  return <Button text={text} mt={5} isLoading={pending} />;
}

export default Submit;
