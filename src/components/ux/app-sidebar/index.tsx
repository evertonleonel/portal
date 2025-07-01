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
    icon: 'notification-sucess',
  },
  {
    title: 'Calendar',
    url: '#',
    icon: 'chevronArrow',
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
  return (
    <Sidebar collapsible="icon" className="relative">
      <SidebarHeader>
        <p>test</p>
      </SidebarHeader>
      <SidebarTrigger className="max-w-[480px]:hidden z-100" />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Icon name={item.icon as IconsName} />
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
