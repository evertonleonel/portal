import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ux/app-sidebar';
import { cn } from '@/lib/utils';

import { Footer } from '../footer';
import { Header } from '../header';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AuthLayoutContent children={children} />
    </SidebarProvider>
  );
};

export const AuthLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { state, isMobile } = useSidebar();
  const sideBarIsExpanded = state === 'expanded';
  const sideBarIsCollapsed = state === 'collapsed';
  return (
    <>
      <AppSidebar />
      <div className="relative flex flex-1 flex-col">
        <Header>
          <SidebarTrigger className={`top-14 min-[480px]:hidden`} />
        </Header>
        <main
          className={cn(
            'relative h-full max-h-[calc(100vh-6.75rem)] flex-1 overflow-auto p-2 sm:p-4 md:p-6 lg:px-10 lg:py-8',
            sideBarIsExpanded && 'max-w-[calc(100vw-16rem)]',
            sideBarIsCollapsed && 'max-w-[calc(100vw-4.5rem)]',
            isMobile && 'max-w-[100vw]'
          )}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
