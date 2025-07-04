import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useSigninContext } from '@/pages/auth/signin/context';
import { getAllEmpresa, type GetEmpresaResponse } from '@/services/empresa';

import { defaultValues, type RegisterInputs, registerSchema } from '../schema';

export const useFormRegister = () => {
  const [isPending] = useTransition();
  const { handleUpdateViewForm } = useSigninContext();
  const [empresa, setEmpresa] = useState<GetEmpresaResponse[]>([]);

  const formRegister = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  useEffect(() => {
    async function fetchEmpresa() {
      try {
        const data = await getAllEmpresa();
        setEmpresa(data);
      } catch (error) {
        console.error('Erro ao buscar empresa:', error);
      }
    }

    fetchEmpresa();
  }, []);

  console.log(empresa, 'empresa');

  const onSubmit = (inputs: RegisterInputs) => {
    console.log(inputs, 'input');
    handleUpdateViewForm({ sucess: true });
  };

  return {
    isPending,
    formRegister,
    onSubmit,
  };
};
