import { LayoutListIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

import { MenuModal } from './_components/menu-modal';
import {
  MenuModalProvider,
  usePreviewMenuModal,
} from './_components/menu-modal/context';
import { SubMenuModal } from './_components/submenu-modal';
import {
  SubMenuModalProvider,
  usePreviewSubMenuModal,
} from './_components/submenu-modal/context';
import { TableMenus } from './_components/table-menus';
import { MenuManagementProvider } from './context';

export default function UserMenuManagement() {
  return (
    <MenuManagementProvider>
      <SubMenuModalProvider>
        <MenuModalProvider>
          <UserMenuManagementContent />
        </MenuModalProvider>
      </SubMenuModalProvider>
    </MenuManagementProvider>
  );
}

const UserMenuManagementContent = () => {
  const previewMenuModal = usePreviewMenuModal();
  const previewSubMenuModal = usePreviewSubMenuModal();

  return (
    <div className="flex h-full flex-col gap-8">
      <section className="flex items-center gap-3">
        <LayoutListIcon className="text-primary size-5" />
        <h1 className="text-primary font-semibold">Gerenciamento de Menus</h1>
      </section>
      <section className="space-y-4.5 h-full w-full">
        <div className="border-table flex w-full flex-wrap items-center justify-between gap-4 border-b py-1 md:gap-0">
          <div className="text-primary flex items-center gap-2 font-semibold">
            <Icon name="stack" className="size-5" />
            Menus
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => previewMenuModal.onOpen()}>
              <Icon name="addSquare" className="size-5" />
              Novo Menu
            </Button>
            <Button onClick={() => previewSubMenuModal.onOpen()}>
              <Icon name="addSquare" className="size-5" />
              Novo Submenu
            </Button>
          </div>
        </div>
        <TableMenus />
      </section>
      <MenuModal />
      <SubMenuModal />
    </div>
  );
};
