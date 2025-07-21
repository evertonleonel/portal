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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useMenuManagementContext } from '../../context';
import { mockMenu } from '../table-menus';
import { useSubMenuFormModal } from './hook/use-submenu-form-modal';

export const SubMenuModal = () => {
  const { onClose, isOpen, menuData, form, onSubmit, inputFullPathValue } =
    useSubMenuFormModal();
  const { isLoading } = useMenuManagementContext();

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
              name="menu"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex gap-0">
                    Menu <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={value => {
                      field.onChange({ id: value });
                    }}
                    value={field.value.id}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            isLoading ? 'Carregando...' : 'Selecione'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="empty" disabled>
                          Carregando...
                        </SelectItem>
                      ) : mockMenu.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          Nenhuma menu encontrado
                        </SelectItem>
                      ) : (
                        mockMenu.map(m => (
                          <SelectItem key={m.id} value={m.id.toString()}>
                            {m.desc}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            <div className="itens-center grid gap-2 sm:flex">
              <FormField
                control={form.control}
                name="caminho"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex gap-0">
                      Caminho da Sub-rota
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: /sistema/nome-da-sub-rota"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="caminho"
                render={() => (
                  <FormItem className="w-full self-start">
                    <div className="h-3" />
                    <FormControl>
                      <Input
                        disabled
                        value={inputFullPathValue}
                        className="bg-muted"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
