import { z } from 'zod';

export const justificarSolicitacaoSchema = z.object({
  justificativa: z
    .string()
    .min(3, { message: 'A justificativa precisa ter pelo menos 3 caracteres.' })
    .max(500, {
      message: 'A justificativa não pode ter mais de 500 caracteres.',
    }),
});

export type JustificarSolicitacaoFormData = z.infer<
  typeof justificarSolicitacaoSchema
>;

export const defaultValuesJustificativa = {
  justificativa: '',
};
