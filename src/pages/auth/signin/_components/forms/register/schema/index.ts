import z from 'zod';

export const registerSchema = z.object({
  nome: z.string().nonempty('O campo Nome é obrigatório'),
  email: z.string().nonempty('O campo E-mail é obrigatório').email('Digite um e-mail válido'),
  empresa: z.string().nonempty('O campo Empresa é obrigatório'),
  cargo: z.string().nonempty('O campo Cargo é obrigatório'),
});

export type RegisterInputs = z.infer<typeof registerSchema>;

export const defaultValues = {
  nome: '',
  email: '',
  empresa: '',
  cargo: '',
};
