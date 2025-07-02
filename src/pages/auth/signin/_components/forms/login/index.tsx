import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useFormLogin } from './hook/use-form-login';

export const LoginForm = () => {
  const { error, isPending, formLogin, onSubmit } = useFormLogin();

  return (
    <Form {...formLogin}>
      <form className="mt-[46px] grid gap-4" onSubmit={(...args) => void formLogin.handleSubmit(onSubmit)(...args)}>
        {error.error && (
          <FormMessage className="text-center font-semibold">
            <span>Prezado usuário, seu e-mail não está autorizado para acesso.</span>
            <span>Solicite seu cadastro no sistema na aba acima “Cadastro”.</span>
          </FormMessage>
        )}
        {error.warning && (
          <FormMessage className="text-baixada-warning-600 text-center font-semibold">
            <span> Prezado usuário, seu e-mail já foi cadastrado e está em processo de aprovação.</span>
            <span> Por favor, aguarde a confirmação por e-mail para acessar o sistema.</span>
          </FormMessage>
        )}

        <FormField
          control={formLogin.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail corporativo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4" disabled={isPending}>
          Continuar login
        </Button>
      </form>
    </Form>
  );
};
