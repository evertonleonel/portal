import { EllipsisIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { UserRequestStatus } from '@/components/ui/status/user-requests-status';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { GetUserRequestsResponse } from '@/types/user/requests/http';

import { useUserApprovalRequestsContext } from '../../context';

interface CellActionProps {
  data: GetUserRequestsResponse;
}

export const CellAction = ({ data }: CellActionProps) => {
  const {
    handleOpenApproveModal,
    handleSetUsuarioApprove,
    handleOpenJustificationModal,
  } = useUserApprovalRequestsContext();
  const { statusAprovacaoFips, statusAprovacaoMrs } = data;

  const canApproveOrReject =
    statusAprovacaoFips === 'P' && statusAprovacaoMrs === 'P';

  return (
    <>
      <div className="flex justify-center gap-2 max-lg:hidden lg:gap-4">
        <UserRequestStatus
          onClick={() => {
            handleSetUsuarioApprove(data);
            handleOpenApproveModal();
          }}
          className="cursor-pointer"
          variant={canApproveOrReject ? 'approve' : 'disable'}
          disabled={!canApproveOrReject}
        >
          <Icon name="checkCircle" />
          Permitir
        </UserRequestStatus>
        <UserRequestStatus
          className="cursor-pointer"
          onClick={() => {
            handleSetUsuarioApprove(data);
            handleOpenJustificationModal();
          }}
          variant={canApproveOrReject ? 'notApprove' : 'disable'}
          disabled={!canApproveOrReject}
        >
          <Icon name="closeCircle" />
          Negar
        </UserRequestStatus>
      </div>

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
            <DropdownMenuItem
              className="rounded-none"
              disabled={!canApproveOrReject}
              onClick={() => {
                handleSetUsuarioApprove(data);
                handleOpenApproveModal();
              }}
            >
              Permitir
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center rounded-none"
              disabled={!canApproveOrReject}
              onClick={() => {
                handleSetUsuarioApprove(data);
                handleOpenJustificationModal();
              }}
            >
              Negar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
