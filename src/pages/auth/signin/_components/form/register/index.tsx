import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const RegisterForm = () => {
  const { control } = useFormContext();
  return (
    <div className="mt-[21px] grid gap-4">
      <p className="text-baixada-dark-blue-950 text-[10px]">
        <span className="text-baixada-error-500">*</span> Campos obrigatórios
      </p>
      <Controller
        control={control}
        name="nome"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label className="flex">
              Nome <span className="text-baixada-error-500">*</span>
            </Label>
            <Input placeholder="Seu nome aqui" {...field} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="emailCorporativo"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label className="flex">
              E-mail corporativo <span className="text-baixada-error-500">*</span>
            </Label>

            <Input placeholder="Digite seu e-mail corporativo" {...field} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="cargo"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label className="flex">
              Cargo <span className="text-baixada-error-500">*</span>
            </Label>
            <Input placeholder="Sua atuação" {...field} />
          </div>
        )}
      />
    </div>
  );
};
