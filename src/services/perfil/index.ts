import { api } from '@/lib/axios';
import type { PerfilResponseParams } from '@/types/perfil/http';

export async function allProfiles() {
  const response = await api.get<PerfilResponseParams[]>(`/v1/perfil`);
  return response.data;
}
