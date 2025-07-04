import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ux/app-sidebar';

import { Footer } from '../footer';
import { Header } from '../header';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SidebarProvider>
        <AppSidebar />
        <div className="relative flex flex-1 flex-col">
          <Header>
            <SidebarTrigger className={`top-14 min-[480px]:hidden`} />
          </Header>
          <main className="relative flex-1 px-2 sm:p-4 md:p-6 lg:px-10 lg:py-8">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
};
