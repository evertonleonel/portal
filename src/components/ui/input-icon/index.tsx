import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputIconProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode;
}

function InputIcon({
  icon,
  className,
  type = 'text',
  ...props
}: InputIconProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          {icon}
        </div>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm outline-none transition-[color,box-shadow]',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
          icon ? 'pl-9' : 'pl-3'
        )}
        {...props}
      />
    </div>
  );
}

export { InputIcon };
