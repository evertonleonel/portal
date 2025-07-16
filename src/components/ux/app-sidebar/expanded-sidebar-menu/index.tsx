import { Link, useLocation } from 'react-router-dom';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Icon, type IconsName } from '@/components/ui/icon';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
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

interface ExpandedSidebarMenuProps {
  items: MenuItem[];
  openItems: Record<string, boolean>;
  toggleItem: (itemTitle: string) => void;
  isItemActive: (item: MenuItem) => boolean;
}

export const ExpandedSidebarMenu = ({
  items,
  openItems,
  toggleItem,
  isItemActive,
}: ExpandedSidebarMenuProps) => {
  const location = useLocation();

  const isSubMenuActive = (url: string) => {
    return location.pathname === url;
  };

  // Versão desktop - com encolhimento removerá o texto automaticamente

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              {item.subMenus ? (
                // Item com submenus - usa Collapsible
                <Collapsible
                  open={openItems[item.title]}
                  onOpenChange={() => toggleItem(item.title)}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger
                    asChild
                    className="group-data-[state=open]/collapsible:text-sidebar-accent-foreground group-data-[state=open]/collapsible:bg-background"
                  >
                    <SidebarMenuButton
                      asChild
                      className="data-[active=true]:hover:bg-sidebar-accent/90 h-10"
                      isActive={isItemActive(item)}
                    >
                      <Link to={item.url}>
                        <Icon
                          name={item.icon as IconsName}
                          className="size-5"
                        />
                        <div className="flex w-full items-center justify-between">
                          <span>{item.title}</span>
                          <Icon
                            name="chevronDownArrow"
                            className="size-4 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180"
                          />
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="py-3">
                    <SidebarMenuSub className="border-primary-foreground space-y-3 border-l-2">
                      {item.subMenus.map(sub => (
                        <SidebarMenuSubItem
                          key={sub.id}
                          className={cn(
                            'hover:bg-primary cursor-pointer rounded-lg px-3 py-2 text-xs transition-colors',
                            isSubMenuActive(sub.url) && 'bg-primary',
                            isSubMenuActive(sub.url) && 'hover:bg-primary/90'
                          )}
                        >
                          <Link to={sub.url}>{sub.nome}</Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                // Item sem submenus - apenas link simples
                <SidebarMenuButton
                  asChild
                  className="data-[active=true]:hover:bg-sidebar-accent/90 h-10"
                  isActive={isItemActive(item)}
                >
                  <Link to={item.url}>
                    <Icon name={item.icon as IconsName} className="size-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
