import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateWithHour(date: string | Date) {
  return format(new Date(date), "dd/MM/yyyy HH:mm'h'", { locale: ptBR });
  // => 30/12/2020 15:30h
}
