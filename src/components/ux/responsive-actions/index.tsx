import { EllipsisIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

export const ResponsiveActions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Ações</span>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          className="divide divide-input divide-y px-0"
          align="start"
        >
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ResponsiveActionButton = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) => {
  return (
    <DropdownMenuItem className={cn('rounded-none', className)} {...props} />
  );
};
