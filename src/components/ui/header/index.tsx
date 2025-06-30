import { Button } from '../button';
import { Icon } from '../icon';

export const Header = () => {
  return (
    <header className="border-baixada-gray-red-50 flex h-[54px] items-center justify-between border-b bg-white px-2 py-[7px] sm:px-4 md:px-6 lg:px-10">
      <Button size="icon" className="ml-auto">
        <Icon name="bell" color="#f45" animate="animate-pulse" />
      </Button>
    </header>
  );
};
