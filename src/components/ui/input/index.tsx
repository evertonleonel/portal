import * as React from 'react';

import { cn } from '@/utils/lib/tailwind-merge';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'border-baixada-neutral-400 ring-offset-baixada-blue-100 placeholder:text-baixada-neutral-400 focus-visible:ring-ring flex h-12 w-full rounded-lg border bg-white px-3 text-xs font-medium file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
