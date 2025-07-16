import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Menu } from '@/types/menu';

interface CellActionTableMenuProps {
  data: Menu;
}

export const CellActionTableMenu = ({ data }: CellActionTableMenuProps) => {
  return (
    <div className="flex justify-center gap-2 max-lg:hidden lg:gap-4">
      <Tooltip>
        <TooltipTrigger>
          <Button
            className="cursor-pointer"
            size={'icon'}
            variant={'ghost'}
            onClick={() => console.log(data)}
          >
            <Icon name="checkCircle" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Editar</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            className="cursor-pointer"
            size={'icon'}
            variant={'ghost'}
            onClick={() => console.log(data)}
          >
            <Icon name="trash" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Deletar</TooltipContent>
      </Tooltip>
    </div>
  );
};
