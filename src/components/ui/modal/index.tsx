import { cva, type VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type ModalVariant = 'default' | 'baixada';

const ModalVariantContext = createContext<ModalVariant>('default');

export const useModalVariant = () => useContext(ModalVariantContext);

const modalVariants = cva('', {
  variants: {
    variant: {
      default: '',
      baixada: 'border-0 p-0 font-manrope overflow-hidden',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  variant,
  className,
}: ModalProps) => {
  const effectiveVariant: ModalVariant = variant ?? 'default';

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <ModalVariantContext.Provider value={effectiveVariant}>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent
          className={cn(
            modalVariants({ variant: effectiveVariant, className })
          )}
        >
          {children}
        </DialogContent>
      </Dialog>
    </ModalVariantContext.Provider>
  );
};

const modalHeaderVariants = cva('', {
  variants: {
    variant: {
      default: '',
      baixada:
        'pr-4.5 rounded-t-md py-3 pl-4 sm:pl-6 sm:pr-7 md:pl-8 md:pr-9 bg-sidebar-border text-background',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const modalTitleVariants = cva('', {
  variants: {
    variant: {
      default: '',
      baixada: 'text-base md:text-lg lg:text-xl ',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const ModalTitle = ({
  children,
  variant,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof modalTitleVariants>) => {
  const contextVariant = useModalVariant();
  const effectiveVariant = variant ?? contextVariant;
  return (
    <DialogHeader
      className={cn(modalHeaderVariants({ variant: effectiveVariant }))}
      {...props}
    >
      <DialogTitle
        className={cn(
          modalTitleVariants({ variant: effectiveVariant, className })
        )}
      >
        {children}
      </DialogTitle>
    </DialogHeader>
  );
};

const modalFooterVariants = cva('flex gap-4', {
  variants: {
    variant: {
      default: '',
      baixada:
        'pt-4.5 md:pt-7.5 pr-4.5 pb-5 pl-4 sm:pl-6 sm:pr-7 md:pl-8 md:pr-9',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const ModalFooter = ({
  children,
  variant,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof modalFooterVariants>) => {
  const contextVariant = useModalVariant();
  const effectiveVariant = variant ?? contextVariant;

  return (
    <DialogFooter
      className={cn(
        modalFooterVariants({ variant: effectiveVariant, className })
      )}
      {...props}
    >
      {children}
    </DialogFooter>
  );
};

const modalContentVariants = cva('', {
  variants: {
    variant: {
      default: '',
      baixada:
        'pt-4.5 md:pt-7.5 pr-4.5 pb-5 pl-4 sm:pl-6 sm:pr-7 md:pl-8 md:pr-9',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const ModalContent = ({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof modalContentVariants>) => {
  const contextVariant = useModalVariant();
  const effectiveVariant = variant ?? contextVariant;
  return (
    <div
      className={cn(
        modalContentVariants({ variant: effectiveVariant }),
        className
      )}
      {...props}
    />
  );
};
