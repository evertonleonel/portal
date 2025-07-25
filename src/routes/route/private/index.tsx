import { lazy } from 'react';

import type { RouteConfig } from '..';

const InitialPage = lazy(() => import('@/pages/pagina-inicial/page'));

const UserApprovalRequests = lazy(
  () => import('@/pages/user-approval-requests/page')
);
const UserMenuManagement = lazy(() => import('@/pages/menu-management/page'));

export const PrivateRoutes: RouteConfig[] = [
  {
    path: '/pagina-inicial',
    component: InitialPage,
    acessType: [], // Acessível para todos os usuários autenticados
    private: true,
  },
  {
    path: '/solicitacao-cadastro',
    component: UserApprovalRequests,
    acessType: [],
    private: true,
  },
  {
    path: '/cadastro-menu',
    component: UserMenuManagement,
    acessType: [],
    private: true,
  },
];
