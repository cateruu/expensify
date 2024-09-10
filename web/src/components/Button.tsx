import Spinner from '@/app/loaders/Spinner';
import { cn } from '@/utils/cn';
import React from 'react';

interface Props {
  onClick?: () => void;
  text: string;
  mt?: number;
  disabled?: boolean;
  isLoading?: boolean;
}

function Button({ onClick, text, mt, disabled, isLoading }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full px-4 h-[46px] py-3 rounded-xl text-sm font-medium flex justify-center bg-green-600 cursor-pointer transition-all hover:bg-green-700 ',
        mt && `mt-${mt}`
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner /> : text}
    </button>
  );
}

export default Button;
