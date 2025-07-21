import { api } from '@/lib/axios';
import type {
  DeleteMenuParams,
  GetMenuByIdParams,
  GetMenuResponse,
  PatchMenuParams,
  PostMenuBody,
  PostSubMenuBody,
} from '@/types/menu';

export async function getAllMenu() {
  const response = await api.get<GetMenuResponse[]>(`/v1/menu`);
  return response.data;
}

export async function getMenuById({ id }: GetMenuByIdParams) {
  const response = await api.get<GetMenuResponse>(`/v1/menu/${id}`);
  return response.data;
}

export async function postMenu({ desc, caminho }: PostMenuBody) {
  await api.post(`/v1/menu`, { desc, caminho });
}

export async function deleteMenu({ id }: DeleteMenuParams) {
  await api.delete(`/v1/menu/${id}`);
}

export async function patchMenu({ id, desc, caminho }: PatchMenuParams) {
  await api.patch(`/v1/menu/${id}`, { desc, caminho });
}

export async function postSubMenu({
  desc,
  caminho,
  menuPrincipal,
  ordemExibicao,
}: PostSubMenuBody) {
  await api.post(`/v1/menu`, { desc, caminho, menuPrincipal, ordemExibicao });
}

export async function patchSubMenu({
  id,
  desc,
  caminho,
  menuPrincipal,
  ordemExibicao,
}: PatchMenuParams) {
  await api.patch(`/v1/menu/${id}`, {
    desc,
    caminho,
    menuPrincipal,
    ordemExibicao,
  });
}
