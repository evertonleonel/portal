import { BackgroundImage } from '@/components/ui/background-image';
import { Icon, type IconsName } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/utils/lib/tailwind-merge';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: 'chevronRightArrow',
  },
  {
    title: 'Inbox',
    url: '#',
    icon: 'chevronDownArrow',
  },
  {
    title: 'Calendar',
    url: '#',
    icon: 'chevronUpArrow',
  },
  {
    title: 'Search',
    url: '#',
    icon: 'chevronLeftArrow',
  },
  {
    title: 'Settings',
    url: '#',
    icon: 'microsoft',
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  // Determina qual logo usar baseado no estado da sidebar
  const logoSrc =
    state === 'collapsed' && !isMobile
      ? 'images/logos/logo-portal-baixada-sigla-branco.svg'
      : 'images/logos/logo-portal-baixada-branca.svg';

  return (
    <Sidebar collapsible="icon" className="shadow-baixada-popover relative">
      <SidebarHeader
        className={cn('px-4 py-6', state === 'collapsed' && 'pb-3')}
      >
        <BackgroundImage src={logoSrc} className="max-h-10" />
      </SidebarHeader>
      <Separator className="mx-4 mb-4 opacity-10" />

      <SidebarTrigger className={cn('z-100', isMobile && 'hidden')} />
      <SidebarContent className="bg-sidebar-baixada">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <a href={item.url}>
                      <Icon name={item.icon as IconsName} className="size-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
