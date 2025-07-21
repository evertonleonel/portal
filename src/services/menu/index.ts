import { api } from '@/lib/axios';
import type { GetMenuResponse } from '@/types/menu';

export async function getAllMenu() {
  const response = await api.get<GetMenuResponse[]>(`/v1/menu`);
  return response.data;
}
