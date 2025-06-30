import { AppSidebar } from '@/components/ux/app-sidebar';
import { MOBILE_BREAKPOINT } from '@/hooks/use-mobile';

import { Footer } from '../../footer';
import { Header } from '../../header';
import { SidebarProvider, SidebarTrigger } from '../../sidebar';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SidebarProvider>
        <AppSidebar />
        <div className="relative flex flex-1 flex-col">
          <Header>
            <SidebarTrigger className={`top-14 min-[${MOBILE_BREAKPOINT}px]:hidden`} />
          </Header>
          <main className="relative flex-1 px-2 sm:p-4 md:p-6 lg:px-10 lg:py-8">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
};
