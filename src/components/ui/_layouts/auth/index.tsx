import { Footer } from '../../footer';
import { Header } from '../../header';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 px-2 sm:p-4 md:p-6 lg:px-10 lg:py-8">{children}</main>
      <Footer />
    </div>
  );
};
