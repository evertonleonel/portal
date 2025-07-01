import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoginForm = () => {
  const { control } = useFormContext();
  return (
    <div className="mt-[46px] grid gap-4">
      <div className="text-baixada-error-500 mb-4 text-center text-xs font-semibold">
        <p>Prezado usuário, seu e-mail não está autorizado para acesso.</p>
        <p>Solicite seu cadastro no sistema na aba acima “Cadastro”.</p>
      </div>

      <Controller
        control={control}
        name="nome"
        render={({ field }) => (
          <div className="grid gap-2">
            <Label>E-mail corporativo</Label>
            <Input placeholder="Digite seu e-mail corporativo" {...field} />
          </div>
        )}
      />
      <Button className="mt-4">Continuar login</Button>
    </div>
  );
};
