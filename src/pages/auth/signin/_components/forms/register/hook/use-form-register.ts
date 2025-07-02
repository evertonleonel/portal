import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useSigninContext } from '@/pages/auth/signin/context';

import { defaultValues, type RegisterInputs, registerSchema } from '../schema';

export const useFormRegister = () => {
  const [isPending] = useTransition();
  const { handleUpdateViewForm } = useSigninContext();

  const formRegister = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

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
