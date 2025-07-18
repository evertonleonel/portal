import type { MouseEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ResponsiveActionButton,
  ResponsiveActions,
} from '@/components/ux/responsive-actions';
import type { Menu } from '@/types/menu';

import { usePreviewMenuModal } from '../../context/menu-modal';

interface CellActionTableMenuProps {
  data: Menu;
}

export const CellActionTableMenu = ({ data }: CellActionTableMenuProps) => {
  const previewMenuModal = usePreviewMenuModal();

  const onPreview: MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = event => {
    event.stopPropagation();
    previewMenuModal.onOpen(data);
  };

  return (
    <>
      <div className="mr-auto flex justify-end gap-2 max-lg:hidden lg:gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={onPreview}
              className="cursor-pointer"
              size="icon"
              variant="ghost"
            >
              <Icon name="editPencil" className="text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Editar</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => console.log(data)}
              className="cursor-pointer"
              size={'icon'}
              variant={'ghost'}
            >
              <Icon name="trash" className="text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Excluir</TooltipContent>
        </Tooltip>
      </div>
      <div className="lg:hidden">
        <ResponsiveActions>
          <ResponsiveActionButton onClick={onPreview}>
            Editar
          </ResponsiveActionButton>
          <ResponsiveActionButton>Excluir</ResponsiveActionButton>
        </ResponsiveActions>
      </div>
    </>
  );
};
