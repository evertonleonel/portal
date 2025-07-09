import { cva, type VariantProps } from 'class-variance-authority';
import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { USER_REQUEST_STATUS } from '@/types/_enums/user-request-status';

type REQUESTS_STATUS = keyof typeof USER_REQUEST_STATUS;

const LABEL: Record<REQUESTS_STATUS, string> = {
  PENDENTE: 'text-baixada-warning-500',
  APROVADO: 'text-baixada-success-500',
  NEGAR: 'text-baixada-error-600',
};

const BG: Record<REQUESTS_STATUS, string> = {
  PENDENTE: 'bg-baixada-warning-50',
  APROVADO: 'bg-baixada-success-50/25',
  NEGAR: 'bg-baixada-error-50',
};

interface StatusProps extends PropsWithChildren, React.ComponentProps<'span'> {
  status?: REQUESTS_STATUS;
  className?: string;
}

const requestVariants = cva(
  'font-manrope w-fit rounded-xl px-3 py-1 flex gap-1 items-center',
  {
    variants: {
      variant: {
        default: 'font-semibold flex gap-1',
        neutral: 'bg-muted-foreground/8 text-muted-foreground font-normal',
      },
    },
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
}: StatusProps & VariantProps<typeof requestVariants>) => {
  if (!status)
    return (
      <span className={cn(requestVariants({ variant, className }))}>
        {children}
      </span>
    );

  return (
    <span
      className={cn(
        requestVariants({ variant }),
        LABEL[status],
        BG[status],
        className
      )}
    >
      {children}
      <p>{USER_REQUEST_STATUS[status]}</p>
    </span>
  );
};
