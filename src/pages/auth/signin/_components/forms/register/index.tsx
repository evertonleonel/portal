import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useFormRegister } from './hook/use-form-register';

export const RegisterForm = () => {
  const { isPending, formRegister, onSubmit } = useFormRegister();
  return (
    <Form {...formRegister}>
      <form
        className="mt-[21px] grid w-full gap-4"
        onSubmit={(...args) =>
          void formRegister.handleSubmit(onSubmit)(...args)
        }
      >
        <p className="text-baixada-dark-blue-950 text-[10px]">
          <span className="text-baixada-error-500">*</span> Campos obrigatórios
        </p>

        <FormField
          control={formRegister.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-0">
                Nome <span className="text-baixada-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Seu nome aqui" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formRegister.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-0">
                E-mail corporativo{' '}
                <span className="text-baixada-error-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail corporativo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 md:grid-cols-[176px_1fr]">
          <FormField
            control={formRegister.control}
            name="empresa"
            render={({ field }) => (
              <FormItem className="w-full self-start">
                <FormLabel className="flex gap-0">
                  Empresa <span className="text-baixada-error-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full md:max-w-[176px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuário</SelectItem>
                    <SelectItem value="moderator">Moderador</SelectItem>
                    <SelectItem value="guest">Convidado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formRegister.control}
            name="cargo"
            render={({ field }) => (
              <FormItem className="self-start">
                <FormLabel className="flex gap-0">
                  Cargo <span className="text-baixada-error-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu e-mail corporativo"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-4" disabled={isPending}>
          Enviar solicitação
        </Button>
      </form>
    </Form>
  );
};
