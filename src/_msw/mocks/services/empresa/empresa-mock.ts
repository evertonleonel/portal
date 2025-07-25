import { http, HttpResponse } from 'msw';

import type {
  DeleteEmpresaParams,
  GetEmpresaResponse,
  PatchEmpresaParams,
  PostEmpresaBody,
} from '@/types/empresa/http';

export const getEmpresaMock = http.get<never, never, GetEmpresaResponse[]>(
  '/v1/empresa',
  () => {
    return HttpResponse.json([
      {
        id: 2,
        sigla: 'FIPS',
        nome: 'FIPS',
        ativo: true,
        dataCriacao: '2025-06-30T18:45:04.137',
        usuarioCriacao: {
          id: 1,
          nome: 'Sist-Portal Unificado',
          dataCriacao: '2025-06-30T18:44:43.45',
        },
        dataAlteracao: null,
        usuarioAlteracao: null,
      },
      {
        id: 3,
        sigla: 'MRS',
        nome: 'MRS',
        ativo: true,
        dataCriacao: '2025-06-30T18:45:04.127',
        usuarioCriacao: {
          id: 1,
          nome: 'Sist-Portal Unificado',
          dataCriacao: '2025-06-30T18:44:43.45',
        },
        dataAlteracao: null,
        usuarioAlteracao: null,
      },
    ]);
  }
);

export const getEmpresaByIdMock = http.get<never, never, GetEmpresaResponse>(
  '/v1/empresa/:id',
  () => {
    return HttpResponse.json({
      id: 4,
      sigla: 'RUMO',
      nome: 'RUMO',
      ativo: true,
      dataCriacao: '2025-06-30T18:45:04.133',
      usuarioCriacao: {
        id: 1,
        nome: 'Sist-Portal Unificado',
        dataCriacao: '2025-06-30T18:44:43.45',
      },
      dataAlteracao: null,
      usuarioAlteracao: null,
    });
  }
);

export const postEmpresaMock = http.post<never, PostEmpresaBody>(
  '/v1/empresa',
  async ({ request }) => {
    const { nome } = await request.json();

    if (nome === 'Empresa Fantasma') {
      return new HttpResponse(null, {
        status: 204,
      });
    }

    return new HttpResponse(null, { status: 400 });
  }
);

export const patchEmpresaMock = http.patch<PatchEmpresaParams, never, never>(
  '/v1/empresa/:id',
  async ({ params }) => {
    if (params.id === 'error-order-id') {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  }
);

export const deleteEmpresaMock = http.delete<DeleteEmpresaParams, never, never>(
  '/v1/empresa/:id',
  async ({ request }) => {
    const { id } = await request.json();

    if (id === 'id-error-empresa') {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  }
);
