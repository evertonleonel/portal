import { type MouseEventHandler, useTransition } from 'react';
import { toast } from 'sonner';

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
import { deleteMenu } from '@/services/menu';
import type { Menu, SubMenu } from '@/types/menu';
import { catchError } from '@/utils/catch-error';

import { usePreviewMenuModal } from '../menu-modal/context';
import { usePreviewSubMenuModal } from '../submenu-modal/context';

type CellActionTableMenuProps =
  | { dataMenu: Menu; dataSubMenu?: never }
  | { dataMenu?: never; dataSubMenu: SubMenu };

export const CellActionTableMenu = ({
  dataMenu,
  dataSubMenu,
}: CellActionTableMenuProps) => {
  const [isPending, starTransition] = useTransition();
  const previewMenuModal = usePreviewMenuModal();
  const previewSubMenuModal = usePreviewSubMenuModal();

  const handleDeleteMenuAndSubmenu = () => {
    starTransition(async () => {
      if (dataMenu) {
        try {
          await deleteMenu({ id: dataMenu.id.toString() });
          toast.success(`Menu ${dataMenu.desc} excluido com sucesso!`);
        } catch (error) {
          catchError(error);
        }
      }
      if (dataSubMenu) {
        try {
          await deleteMenu({ id: dataSubMenu.id.toString() });
          toast.success(`Sub-menu ${dataSubMenu.desc} excluido com sucesso!`);
        } catch (error) {
          catchError(error);
        }
      }
    });
  };

  const onPreview: MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = event => {
    event.stopPropagation();
    if (dataMenu) {
      previewMenuModal.onOpen(dataMenu);
    }
    if (dataSubMenu) {
      previewSubMenuModal.onOpen(dataSubMenu);
    }
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
              onClick={handleDeleteMenuAndSubmenu}
              className="cursor-pointer"
              size={'icon'}
              variant={'ghost'}
              disabled={isPending}
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
          <ResponsiveActionButton disabled={isPending}>
            Excluir
          </ResponsiveActionButton>
        </ResponsiveActions>
      </div>
    </>
  );
};
