import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon, type IconsName } from '@/components/ui/icon';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type MenuItem = {
  title: string;
  url: string;
  icon: IconsName;
  subMenus?: {
    id: number;
    nome: string;
    url: string;
  }[];
};

interface CollapsedSidebarMenuProps {
  items: MenuItem[];
  isMobile: boolean;
}
export const CollapsedSidebarMenu = ({
  items,
  isMobile,
}: CollapsedSidebarMenuProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              {item.subMenus ? (
                <DropdownMenu>
                  <Tooltip>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton asChild className="h-10">
                        <TooltipTrigger asChild>
                          <Link to={item.url}>
                            <Icon
                              name={item.icon as IconsName}
                              className="size-5"
                            />
                          </Link>
                        </TooltipTrigger>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <TooltipContent
                      side="right"
                      className={cn(isMobile && 'hidden')}
                    >
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>

                  <DropdownMenuContent
                    className="divide divide-input divide-y px-0"
                    align="start"
                  >
                    {item.subMenus.map(sub => (
                      <DropdownMenuItem
                        key={sub.id}
                        className="rounded-none px-3"
                      >
                        <Link to={sub.url}>{sub.nome}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild className="h-10 text-xs">
                      <Link to={item.url}>
                        <Icon
                          name={item.icon as IconsName}
                          className="size-5"
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={cn(isMobile && 'hidden')}
                  >
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
