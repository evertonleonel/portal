import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const registerLogin = z.object({
  email: z.string().nonempty('O campo E-mail é obrigatório').email('Digite um e-mail válido'),
});

export type LoginInputs = z.infer<typeof registerLogin>;

export const useFormLogin = () => {
  const [statusMessage, setStatusMessage] = useState({ error: '', warning: '' });
  const [isPending] = useTransition();

  const formLogin = useForm<LoginInputs>({
    resolver: zodResolver(registerLogin),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: LoginInputs) => {
    console.log(data, 'data');
    setStatusMessage({ error: '', warning: '' });
  };

  return {
    formLogin,
    onSubmit,
    statusMessage,
    isPending,
  };
};
