import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Icon } from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { negarRequestRegister } from '@/services/user/requests/to-deny';
import type { GetUserRequestsResponse } from '@/types/user/requests';

import {
  defaultValuesJustificativa,
  type JustificarSolicitacaoFormData,
  justificarSolicitacaoSchema,
} from './schema';

interface JustificarSolicitacaoModalProps {
  usuario?: GetUserRequestsResponse;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JustificarSolicitacaoModal: React.FC<
  JustificarSolicitacaoModalProps
> = ({ usuario, isOpen, onOpenChange }) => {
  const form = useForm<JustificarSolicitacaoFormData>({
    resolver: zodResolver(justificarSolicitacaoSchema),
    defaultValues: defaultValuesJustificativa,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: JustificarSolicitacaoFormData) => {
    console.log('Justificativa enviada:', data);

    try {
      if (!usuario?.id) {
        return;
      }

      await negarRequestRegister(usuario.id, data);
      // alert('Justificativa enviada com sucesso!');
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao enviar justificativa:', error);
      alert('Erro ao enviar justificativa. Tente novamente.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="modal-content-baixada border-none">
        <DialogHeader className="modal-header-baixada text-left">
          <DialogTitle className="text-background flex gap-1">
            <Icon name="editPencil" />
            Justificar Solicitação
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="px-4">
            <p className="text-modal-description pb-4 font-bold">
              Solicitação negada para o usuário {usuario?.nome}
            </p>
            <p className="pb-2 text-sm">Justificativa da solicitação negada</p>

            <FormField
              control={form.control}
              name="justificativa"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Descreva a razão pela qual a solicitação foi negada..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <DialogFooter className="modal-footer-baixada">
            <Button type="submit" className="h-10" disabled={isSubmitting}>
              <Icon name="editPencilWrite" />
              {isSubmitting ? 'Enviando...' : 'Justificar'}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
