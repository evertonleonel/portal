import { Link, useLocation } from 'react-router-dom';

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
  isItemActive: (item: MenuItem) => boolean;
}

export const CollapsedSidebarMenu = ({
  items,
  isMobile,
  isItemActive,
}: CollapsedSidebarMenuProps) => {
  const location = useLocation();

  const isSubMenuActive = (url: string) => {
    return location.pathname === url;
  };

  //Versão mobile (Sheet)

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
                      <SidebarMenuButton
                        asChild
                        className="data-[active=true]:hover:bg-sidebar-accent/90 h-10"
                        isActive={isItemActive(item)}
                      >
                        <TooltipTrigger asChild>
                          <Link to={item.url}>
                            <Icon
                              name={item.icon as IconsName}
                              className="size-5"
                            />
                            {item.title}
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
                        className={cn(
                          'rounded-none px-3',
                          isSubMenuActive(sub.url) && 'bg-accent',
                          isSubMenuActive(sub.url) && 'hover:bg-accent/90'
                        )}
                      >
                        <Link to={sub.url}>{sub.nome}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      className="data-[active=true]:hover:bg-accent/90 h-10 text-xs"
                      isActive={isItemActive(item)}
                    >
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
