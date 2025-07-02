import z from 'zod';

export const registerSchema = z.object({
  nome: z.string(),
  email: z.string(),
  empresa: z.string(),
  cargo: z.string(),
});

export type RegisterInputs = z.infer<typeof registerSchema>;

export const defaultValues = {
  nome: '',
  email: '',
  empresa: '',
  cargo: '',
};
