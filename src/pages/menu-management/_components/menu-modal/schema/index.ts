import z from 'zod';

export const menuModalFormSchema = z.object({
  desc: z
    .string({ message: 'O campo Descrição é obrigatório' })
    .nonempty('O campo Descrição é obrigatório')
    .refine(val => val.trim().length > 0, {
      message: 'O campo Descrição é obrigatório',
    }),
  caminho: z
    .string({ message: 'O campo Caminho da Rota é obrigatório' })
    .refine(value => value.startsWith('/'), {
      message: 'O caminho da rota deve começar com "/"',
    }),
});

export type MenuModalFormInputs = z.infer<typeof menuModalFormSchema>;

export const defaultValuesModalForm: MenuModalFormInputs = {
  desc: '',
  caminho: '',
};
