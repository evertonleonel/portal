import type { ReactNode } from 'react';

import { cn } from '@/utils/lib/tailwind-merge';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export const Label = ({ children, className }: LabelProps) => {
  return <label className={cn('text-baixada-dark-blue-950 text-xs font-bold', className)}>{children}</label>;
};
