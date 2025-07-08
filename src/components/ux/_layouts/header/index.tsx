import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';

export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="border-baixada-gray-red-50 bg-background flex h-[54px] items-center justify-between border-b px-2 py-[7px] sm:px-4 md:px-6 lg:px-10">
      {children}
      <Button size="icon" className="ml-auto">
        <Icon name="bell" color="#f45" animate="animate-pulse" />
      </Button>
    </header>
  );
};
