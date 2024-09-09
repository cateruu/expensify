import { cn } from '@/utils/cn';
import React from 'react';

interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  fullWidth?: boolean;
}

function Input({ name, type, placeholder, fullWidth }: Props) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={cn(
        'bg-green-950 py-3 px-4 rounded-xl text-sm border-[1px] border-green-950 outline-none focus:border-green-800',
        fullWidth && 'w-full'
      )}
    />
  );
}

export default Input;
