import { cn } from '@/utils/cn';
import React from 'react';

interface Props {
  onClick?: () => void;
  text: string;
  mt?: number;
}

function Button({ onClick, text, mt }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full px-4 py-3 rounded-xl text-sm font-medium text-center bg-green-600 transition-all hover:bg-green-700',
        mt && `mt-${mt}`
      )}
    >
      {text}
    </button>
  );
}

export default Button;
