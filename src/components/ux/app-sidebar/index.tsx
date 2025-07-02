import { Icon, type IconsName } from '@/components/ui/icon';
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
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/utils/lib/tailwind-merge';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: 'x',
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
    icon: 'inputSearch',
  },
  {
    title: 'Settings',
    url: '#',
    icon: 'microsoft',
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon" className="relative">
      <SidebarHeader>
        <p>test</p>
      </SidebarHeader>
      <SidebarTrigger className={cn('z-100', isMobile && 'hidden')} />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
