import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from '@/components/ui/modal';

import { useSubMenuFormModal } from './hook/use-submenu-form-modal';

export const SubMenuModal = () => {
  const { onClose, isOpen, menuData, form, onSubmit } = useSubMenuFormModal();

  return (
    <Modal variant={'baixada'} isOpen={isOpen} onClose={onClose}>
      <ModalTitle className="flex items-center gap-2">
        <Icon name="editPencil" />
        {menuData ? 'Editar submenu' : '  Cadastrar novo submenu'}
      </ModalTitle>
      <DialogDescription className="sr-only">
        Modal para cadastrar novos submenus no sistema
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContent className="space-y-5">
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-0">
                    Descrição <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Sua descrição aqui" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caminho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-0">
                    Caminho da Rota <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: /sistema/nome-da-rota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ModalContent>
          <ModalFooter>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button variant={'baixada'} className="cursor-pointer">
              Cadastrar
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </Modal>
  );
};
