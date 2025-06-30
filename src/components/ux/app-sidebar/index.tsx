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
import { MOBILE_BREAKPOINT } from '@/hooks/use-mobile';

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
    icon: 'move-arrow',
  },
  {
    title: 'Calendar',
    url: '#',
    icon: 'chevron-arrow',
  },
  {
    title: 'Search',
    url: '#',
    icon: 'input-search',
  },
  {
    title: 'Settings',
    url: '#',
    icon: 'input-search',
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="relative">
      <SidebarHeader>
        <p>test</p>
      </SidebarHeader>
      <SidebarTrigger className={`max-[${MOBILE_BREAKPOINT}px]:hidden z-100`} />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
