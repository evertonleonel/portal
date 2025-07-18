import z from 'zod';

export const subMenuModalFormSchema = z.object({
  desc: z
    .string({ message: 'O campo Descrição é obrigatório' })
    .nonempty('O campo Descrição é obrigatório'),
  caminho: z
    .string({ message: 'O campo Caminho da Rota é obrigatório' })
    .refine(value => value.startsWith('/'), {
      message: 'O caminho da rota deve começar com "/"',
    })
    .refine(value => value.endsWith('/'), {
      message: 'O caminho da rota não deve terminar com "/"',
    }),
});

export type SubMenuSubModalFormInputs = z.infer<typeof subMenuModalFormSchema>;

export const defaultValuesSubMenuModalForm: SubMenuSubModalFormInputs = {
  desc: '',
  caminho: '',
};
