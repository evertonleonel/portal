import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllEmpresa } from '@/services/empresa';
import { allProfiles } from '@/services/perfil';
import { approveRequestRegister } from '@/services/user/requests/to-approve';
import type { GetEmpresaResponse } from '@/types/empresa';
import type { PerfilResponseParams } from '@/types/perfil/response';
import type { GetUserRequestsResponse } from '@/types/user/requests';

import {
  type AprovacaoFormData,
  aprovacaoSchema,
  defaultValuesCadastroUsuario,
} from './schema';

interface AprovacaoModalProps {
  usuario?: GetUserRequestsResponse;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AprovacaoModal = ({
  usuario,
  isOpen,
  onOpenChange,
}: AprovacaoModalProps) => {
  const [perfis, setPerfis] = useState<PerfilResponseParams[]>([]);
  const [empresas, setEmpresas] = useState<GetEmpresaResponse[]>([]);

  const form = useForm<AprovacaoFormData>({
    resolver: zodResolver(aprovacaoSchema),

    defaultValues: defaultValuesCadastroUsuario,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: AprovacaoFormData) => {
    try {
      if (!usuario?.id) {
        return;
      }

      await approveRequestRegister(usuario.id, [
        { id: Number(data.perfil.id) },
      ]);

      alert('Sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      if (usuario) {
        reset({
          nome: usuario.nome,
          email: usuario.email,
          empresa: { id: usuario.empresa.id.toString() },
        });

        try {
          const [profiles, companies] = await Promise.all([
            allProfiles(),
            getAllEmpresa(),
          ]);

          setPerfis(profiles);
          setEmpresas(companies);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchProfiles();
  }, [usuario, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="modal-content-baixada border-none">
        <DialogHeader className="modal-header-baixada text-left">
          <DialogTitle className="text-background flex gap-1">
            <Icon name="editPencilWrite" />
            Cadastrar Usuário
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(...args) => handleSubmit(onSubmit)(...args)}
            className="flex flex-col gap-3 px-[30px]"
          >
            <section className="grid grid-cols-2 gap-2.5">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" disabled {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@exemplo.com"
                        disabled
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="grid grid-cols-2 gap-2.5">
              <FormField
                control={form.control}
                name="perfil"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Perfis</FormLabel>
                    <Select
                      onValueChange={value => field.onChange({ id: value })}
                    >
                      <FormControl>
                        <SelectTrigger id="profile" className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {perfis.map(perfil => (
                          <SelectItem
                            key={perfil.id}
                            value={perfil.id.toString()}
                          >
                            {perfil.desc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Empresa</FormLabel>

                    <Select
                      onValueChange={value => field.onChange({ id: value })}
                      value={field.value.id}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger id="company" className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {empresas.map(empresa => (
                          <SelectItem
                            key={empresa.id}
                            value={empresa.id.toString()}
                          >
                            {empresa.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </form>

          <DialogFooter className="modal-footer-baixada">
            <div className="flex">
              <Button
                type="button"
                className="h-10"
                variant="ghost"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="h-10" disabled={isSubmitting}>
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
