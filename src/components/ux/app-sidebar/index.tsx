import { useState } from 'react';

import { BackgroundImage } from '@/components/ui/background-image';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon, type IconsName } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Menu items.
const items = [
  {
    title: 'Página inicial',
    url: '/home',
    icon: 'home',
  },
  {
    title: 'Solicitacão Cadastro',
    url: '/solicitacao-cadastro',
    icon: 'profileTwoUsers',
  },
  {
    title: 'Admin',
    url: '/admin',
    icon: 'profileTwoUsers',
  },
  {
    title: 'Client',
    url: '/client',
    icon: 'profileTwoUsers',
  },
  {
    title: 'Programacao',
    url: '#',
    icon: 'microsoft',
    subMenus: [
      {
        id: 1,
        nome: 'Programação',
        url: '/programacao',
      },
      {
        id: 2,
        nome: 'Indicadores',
        url: '/indicadores',
      },
    ],
  },
  {
    title: 'Inbox',
    url: '#',
    icon: 'microsoft',
    subMenus: [
      {
        id: 1,
        nome: 'Ferrovias',
        url: '/ferrovias',
      },
      {
        id: 2,
        nome: 'Pátios',
        url: '/patios',
      },
    ],
  },
  {
    title: 'Calendar',
    url: '#',
    icon: 'microsoft',
    subMenus: [
      {
        id: 1,
        nome: 'Carga',
        url: '/carga',
      },
      {
        id: 2,
        nome: 'Descarga',
        url: '/descarga',
      },
    ],
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Determina qual logo usar baseado no estado da sidebar
  const logoSrc =
    state === 'collapsed' && !isMobile
      ? 'images/logos/logo-portal-baixada-sigla-branco.svg'
      : 'images/logos/logo-portal-baixada-branca.svg';

  const toggleItem = (itemTitle: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  return (
    <Sidebar collapsible="icon" className="shadow-baixada-popover relative">
      <SidebarHeader
        className={cn(
          'flex-row gap-2 px-4 py-6',
          state === 'collapsed' && 'pb-3'
        )}
      >
        <BackgroundImage src={logoSrc} className="max-h-10" />
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className={cn('z-100', isMobile && 'block')} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Fechar barra lateral</p>
          </TooltipContent>
        </Tooltip>
      </SidebarHeader>
      <Separator className="mx-4 mb-4 opacity-10" />

      <SidebarTrigger className={cn('z-100', isMobile && 'hidden')} />
      <SidebarContent className="bg-sidebar-baixada px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            {state === 'collapsed' && (
              <SidebarMenu>
                {items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    {item.subMenus ? (
                      <DropdownMenu>
                        <Tooltip>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton asChild className="h-10">
                              <TooltipTrigger asChild>
                                <a href={item.url}>
                                  <Icon
                                    name={item.icon as IconsName}
                                    className="size-5"
                                  />
                                </a>
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
                              <a href={sub.url}>{sub.nome}</a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild className="h-10 text-xs">
                            <a href={item.url}>
                              <Icon
                                name={item.icon as IconsName}
                                className="size-5"
                              />
                              <span>{item.title}</span>
                            </a>
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
            )}
            {state === 'expanded' && (
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
                          <SidebarMenuButton asChild className="h-10">
                            <a href={item.url}>
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
                            </a>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-3">
                          <SidebarMenuSub className="border-primary-foreground space-y-3 border-l-2">
                            {item.subMenus.map(sub => (
                              <SidebarMenuSubItem
                                key={sub.id}
                                className="hover:bg-primary cursor-pointer rounded-lg px-3 py-2 text-xs"
                              >
                                <a href={sub.url}>{sub.nome}</a>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      // Item sem submenus - apenas link simples
                      <SidebarMenuButton asChild className="h-10">
                        <a href={item.url}>
                          <Icon
                            name={item.icon as IconsName}
                            className="size-5"
                          />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar-baixada-footer gap-4 px-4 pb-6">
        <Separator className="opacity-10" />
        aa
      </SidebarFooter>
    </Sidebar>
  );
}
