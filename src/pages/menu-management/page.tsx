import { Icon } from '@/components/ui/icon';

import { MenuModal } from './_components/modal';
import { TableMenus } from './_components/table-menus';

export default function UserMenuManagement() {
  return (
    <div className="flex h-full flex-col gap-8">
      <section className="flex gap-3">
        <Icon name="documentCopy" className="text-primary" />
        <h1 className="text-primary font-semibold">Gerenciamento de Menus</h1>
      </section>
      <section className="space-y-4.5 h-full w-full">
        <div className="md:border-table grid w-full items-center justify-between gap-4 md:flex md:gap-0 md:border-b">
          <div className="text-primary flex items-center gap-2 font-semibold">
            <Icon name="profileTickUser" className="size-6" />
            Menus
          </div>
        </div>
        <TableMenus />
        <MenuModal isOpen={true} onClose={() => console.log('')} />
      </section>
    </div>
  );
}
