import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BackgroundImage } from '@/components/ui/background-image';
import { Button } from '@/components/ui/button';
import { Icon, type IconsName } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { ShowContent } from '@/components/ui/show-content';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/context/auth-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

import { CollapsedSidebarMenu } from './collapsed-sidebar-menu';
import { ExpandedSidebarMenu } from './expanded-sidebar-menu';
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
// Menu items.
const items: MenuItem[] = [
  {
    title: 'Página inicial',
    url: '/pagina-inicial',
    icon: 'home',
  },
  {
    title: 'Solicitacão Cadastro',
    url: '/solicitacao-cadastro',
    icon: 'profileTwoUsers',
  },
  {
    title: 'Gerenciamento de Menus',
    url: '/cadastro-menu',
    icon: 'cube3D',
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
        nome: 'Client 1',
        url: '/client',
      },
      {
        id: 2,
        nome: 'Descarga',
        url: '/pagina-inicial',
      },
    ],
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const hasExpandedState = state === 'expanded';
  const hasCollapsedState = state === 'collapsed';

  const isItemActive = (item: MenuItem) => {
    const currentPath = location.pathname;

    if (item.url === currentPath) {
      return true;
    }

    // Verifica se algum submenu está ativo
    if (item.subMenus) {
      return item.subMenus.some(subMenu => subMenu.url === currentPath);
    }

    return false;
  };

  // Determina qual logo usar baseado no estado da sidebar
  const logoSrc =
    hasCollapsedState && !isMobile
      ? 'images/logos/logo-portal-baixada-sigla-branco.svg'
      : 'images/logos/logo-portal-baixada-branca.svg';

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const toggleItem = (itemTitle: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  return (
    <Sidebar
      collapsible="icon"
      className="shadow-baixada-popover relative h-full"
    >
      <SidebarHeader
        className={cn('flex-row gap-2 px-4 py-6', hasCollapsedState && 'pb-3')}
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
        {hasCollapsedState ? (
          <CollapsedSidebarMenu
            items={items}
            isMobile={isMobile}
            isItemActive={isItemActive}
          />
        ) : (
          <ExpandedSidebarMenu
            items={items}
            openItems={openItems}
            toggleItem={toggleItem}
            isItemActive={isItemActive}
          />
        )}
      </SidebarContent>

      <SidebarFooter className="bg-sidebar-baixada-footer gap-4 px-4 pb-6">
        <Separator className="opacity-10" />
        <div className="flex flex-col gap-6">
          <section className="flex gap-3">
            <Tooltip>
              <TooltipTrigger>
                <Avatar
                  className={cn('size-10', hasCollapsedState && 'mx-auto')}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <ShowContent condition={hasCollapsedState && !isMobile}>
                <TooltipContent side="right">Safira Mattos</TooltipContent>
              </ShowContent>
            </Tooltip>

            <ShowContent condition={hasExpandedState || isMobile}>
              <div>
                <p className="truncate">Safira Mattos</p>
                <p className="truncate text-xs">safira@mrs.com.br</p>
              </div>
            </ShowContent>
          </section>

          <Tooltip>
            <TooltipTrigger className="self-start">
              <Button
                className={`text-background cursor-pointer gap-6`}
                variant="ghost"
                size={hasCollapsedState && !isMobile ? 'icon' : 'default'}
                onClick={handleLogout}
              >
                <Icon
                  className={cn(hasExpandedState && 'mb-0.5')}
                  name="logoutArrow"
                />
                {(hasExpandedState || isMobile) && 'Sair'}
              </Button>
            </TooltipTrigger>
            <ShowContent condition={hasCollapsedState && !isMobile}>
              <TooltipContent side="right">Sair</TooltipContent>
            </ShowContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
