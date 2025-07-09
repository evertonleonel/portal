import { cn } from '@/lib/utils';
import { USER_APPROVAL_STATUS } from '@/types/_enums/user-approval-status';

type APPROVAL_STATUS = keyof typeof USER_APPROVAL_STATUS;

const LABEL: Record<APPROVAL_STATUS, string> = {
  APROVADO: 'text-baixada-success-lime-400',
  NEGADO: 'text-baixada-error-700',
};

const BG: Record<APPROVAL_STATUS, string> = {
  APROVADO: 'bg-baixada-success-lime-900/10',
  NEGADO: 'bg-baixada-error-100',
};

interface StatusProps {
  status?: APPROVAL_STATUS;
  children?: React.ReactNode;
  className?: string;
}

export const UserApprovalStatus = ({
  status,
  className,
  children,
}: StatusProps) => {
  if (!status) return null;
  return (
    <p
      className={cn(
        `px-3 py-1 font-semibold ${LABEL[status]} ${BG[status]}`,
        className
      )}
    >
      {USER_APPROVAL_STATUS[status]}
      {children}
    </p>
  );
};
