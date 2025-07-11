import { cva, type VariantProps } from 'class-variance-authority';
import type { PropsWithChildren } from 'react';

// import { cn } from '@/lib/utils';
import {
  USER_REQUEST_STATUS,
  type USER_REQUEST_STATUS_TYPE,
} from '@/types/_enums/user-request-status';

interface StatusProps
  extends PropsWithChildren,
    React.ComponentProps<'button'> {
  status?: USER_REQUEST_STATUS_TYPE;
  className?: string;
}

const requestVariants = cva(
  'font-manrope w-fit rounded-xl px-3 py-1 flex gap-1 items-center font-semibold disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: '',
        disable: 'bg-muted-foreground/8 text-muted-foreground',
        approve:
          'text-baixada-success-600 bg-baixada-success-50/25 hover:bg-baixada-success-100/60 transition-colors',
        notApprove:
          'text-baixada-error-600 bg-baixada-error-50 hover:bg-baixada-error-100/60 transition-colors',
      },
      status: {
        P: '',
        A: '',
        N: '',
      },
    },
    compoundVariants: [
      {
        status: 'P',
        class: 'text-baixada-warning-500 bg-baixada-warning-50',
      },
      {
        status: 'A',
        class: 'text-baixada-success-500 bg-baixada-success-50/25',
      },
      {
        status: 'N',
        class: 'text-baixada-error-600 bg-baixada-error-50',
      },
    ],

    defaultVariants: {
      variant: 'default',
    },
  }
);

export const UserRequestStatus = ({
  status,
  className,
  variant,
  children,
  ...props
}: StatusProps & VariantProps<typeof requestVariants>) => {
  return (
    <button
      {...props}
      className={requestVariants({
        variant,
        status,
        className,
      })}
    >
      {children}
      {status && <span>{USER_REQUEST_STATUS[status]}</span>}
    </button>
  );
};
