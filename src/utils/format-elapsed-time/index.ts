import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatElapsedTime(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;

  const distance = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });

  // Transforma "há 6 horas" → "6 horas atrás"

  if (distance.startsWith('há'))
    return distance.replace(/^há(?: cerca de)?\s/, '').concat(' atrás');
  // remove: "há", "há cerca", "há cerca de"
  // adiciona: "atrás"

  return distance;
}
