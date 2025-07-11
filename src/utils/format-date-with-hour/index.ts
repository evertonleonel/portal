import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateWithHour(date: string | Date) {
  return format(new Date(date), "dd/MM/yyyy HH:mm'h'", { locale: ptBR });
  //saida 10/01/2020 15:30h
}
