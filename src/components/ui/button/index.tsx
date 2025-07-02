import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/lib/tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium  transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-baixada-error-500/40 aria-invalid:border-baixada-error-500',
  {
    variants: {
      variant: {
        default: 'bg-baixada-dark-blue-500  text-baixada-white hover:bg-baixada-dark-blue-700',
        ba: 'bg-baixada-error-500  text-baixada-white hover:bg-baixada-error-700',
        secondary: 'bg-baixada-neutral-blue-50 text-baixada-secondary hover:bg-baixada-neutral-blue-300',
        ghost: 'hover:bg-baixada-white hover:text-baixada-primary',
        link: 'text-baixada-dark-blue-500 underline-offset-4 hover:underline',
        outline:
          'border-[1px] border-baixada-gray-blue-300 text-baixada-gray-blue-700  hover:bg-baixada-slate shadow-baixada-xs',
        destructive: 'bg-baixada-error-500  text-baixada-white hover:bg-baixada-error-700',
      },
      size: {
        default: 'h-12 px-4 py-2',
        sm: 'h-8 rounded-lg px-3',
        lg: 'h-14 rounded-lg px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
