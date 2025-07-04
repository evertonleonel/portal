import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useIsSmallScreen } from '@/hooks/use-small-screen';
import { cn } from '@/utils/lib/tailwind-merge';

import { useFormLogin } from './hook/use-form-login';

export const LoginForm = () => {
  const { statusMessage, isPending, formLogin, onSubmit } = useFormLogin();
  const isSmallScreen = useIsSmallScreen();
  return (
    <Form {...formLogin}>
      <form
        className={cn('mt-[46px] grid gap-4', isSmallScreen && 'mt-4')}
        onSubmit={(...args) => void formLogin.handleSubmit(onSubmit)(...args)}
      >
        {statusMessage.error && (
          <FormMessage className="text-center font-semibold">
            <span>Prezado usuário, seu e-mail não está autorizado para acesso.</span>
            <span>Solicite seu cadastro no sistema na aba acima “Cadastro”.</span>
          </FormMessage>
        )}
        {statusMessage.warning && (
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

        <Button className={cn('mt-4', isSmallScreen && 'mt-2')} disabled={isPending}>
          Continuar login
        </Button>
      </form>
    </Form>
  );
};
