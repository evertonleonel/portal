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
import { useSubMenuFormModal } from './hook/use-submenu-form-modal';

export const SubMenuModal = () => {
  const {
    onClose,
    isOpen,
    subMenuData,
    form,
    onSubmit,
    inputFullPathValue,
    isPending,
  } = useSubMenuFormModal();
  const { isLoading, menus } = useMenuManagementContext();

  return (
    <Modal variant={'baixada'} isOpen={isOpen} onClose={onClose}>
      <ModalTitle className="flex items-center gap-2">
        <Icon name="editPencil" />
        {subMenuData ? 'Editar submenu' : '  Cadastrar novo submenu'}
      </ModalTitle>
      <DialogDescription className="sr-only">
        Modal para cadastrar novos submenus no sistema
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ModalContent className="space-y-5">
            <FormField
              control={form.control}
              name="menuPrincipal"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex gap-0">
                    Menu <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={value => {
                      field.onChange(value);
                    }}
                    value={field.value}
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
                      ) : menus.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          Nenhuma menu encontrado
                        </SelectItem>
                      ) : (
                        menus.map(m => (
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

            <div className="grid gap-4 sm:grid-cols-[1fr_0.5fr] sm:gap-2">
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                name="ordemExibicao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-0">
                      Ordem de Exibição
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="itens-center grid sm:flex sm:gap-2">
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

              <div className="flex w-full flex-col">
                <span className="h-3" />
                <Input
                  disabled
                  value={inputFullPathValue}
                  className="bg-muted mt-auto"
                />
              </div>
            </div>
          </ModalContent>

          <ModalFooter>
            <Button
              className="cursor-pointer"
              variant="ghost"
              onClick={onClose}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              variant={'baixada'}
              disabled={isPending}
              className="cursor-pointer"
            >
              {subMenuData ? 'Editar' : 'Cadastrar'}
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </Modal>
  );
};
