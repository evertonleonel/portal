import { z } from 'zod';

export const aprovacaoSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' })
    .max(50, { message: 'O nome não pode ter mais de 50 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  perfil: z.object({ id: z.string() }).refine(value => value.id !== '', {
    message: 'Campo perfil é obrigatorio',
  }),
  empresa: z.object({ id: z.string() }).refine(value => value.id !== '', {
    message: 'Campo empresa é obrigatorio',
  }),
});

export type AprovacaoFormData = z.infer<typeof aprovacaoSchema>;

export const defaultValuesCadastroUsuario = {
  nome: '',
  email: '',
  perfil: { id: '' },
  empresa: { id: '' },
};
