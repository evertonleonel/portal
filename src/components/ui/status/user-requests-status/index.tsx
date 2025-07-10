import { cva, type VariantProps } from 'class-variance-authority';
import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { USER_REQUEST_STATUS } from '@/types/_enums/user-request-status';

type REQUESTS_STATUS = keyof typeof USER_REQUEST_STATUS;

const LABEL: Record<REQUESTS_STATUS, string> = {
  P: 'text-baixada-warning-500',
  A: 'text-baixada-success-500',
  E: 'text-baixada-error-600',
};

const BG: Record<REQUESTS_STATUS, string> = {
  P: 'bg-baixada-warning-50',
  A: 'bg-baixada-success-50/25',
  E: 'bg-baixada-error-50',
};

interface StatusProps extends PropsWithChildren, React.ComponentProps<'span'> {
  status?: REQUESTS_STATUS;
  className?: string;
}

const requestVariants = cva('font-manrope w-fit rounded-xl px-3 py-1 flex gap-1 items-center font-semibold', {
  variants: {
    variant: {
      default: ' flex gap-1',
      neutral: 'bg-muted-foreground/8 text-muted-foreground ',
      approve: 'text-baixada-success-600 bg-baixada-success-50/25 hover:bg-baixada-success-100/60 transition-colors',
      notApprove: 'text-baixada-error-600 bg-baixada-error-50 hover:bg-baixada-error-100/60 transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const UserRequestStatus = ({
  status,
  className,
  variant,
  children,
}: StatusProps & VariantProps<typeof requestVariants>) => {
  if (!status) return <span className={cn(requestVariants({ variant, className }))}>{children}</span>;

  return (
    <span className={cn(requestVariants({ variant }), LABEL[status], BG[status], className)}>
      {children}
      <p>{USER_REQUEST_STATUS[status]}</p>
    </span>
  );
};
