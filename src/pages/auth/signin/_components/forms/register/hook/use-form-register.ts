import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useSigninContext } from '@/pages/auth/signin/context';
import { userRequestRegister } from '@/services/auth/signin/register';
import { getAllEmpresa } from '@/services/empresa';
import type { GetEmpresaResponse } from '@/types/empresa';

import { defaultValues, type RegisterInputs, registerSchema } from '../schema';

export const useFormRegister = () => {
  const [isPending] = useTransition();
  const { handleUpdateViewForm } = useSigninContext();
  const [empresas, setEmpresas] = useState<GetEmpresaResponse[]>([]);
  const [isLoadingEmpresas, setIsLoadingEmpresas] = useState(true);

  const formRegister = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        setIsLoadingEmpresas(true);
        const data = await getAllEmpresa();
        setEmpresas(data);
      } catch (error) {
        console.error('Erro ao buscar empresa:', error);
      } finally {
        setIsLoadingEmpresas(false);
      }
    }

    fetchEmpresas();
  }, []);

  const onSubmit = async (inputs: RegisterInputs) => {
    try {
      await userRequestRegister(inputs);
      handleUpdateViewForm({ sucess: true });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return {
    isPending,
    formRegister,
    onSubmit,
    empresas,
    isLoadingEmpresas,
  };
};
