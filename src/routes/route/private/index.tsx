import { lazy } from 'react';

import type { RouteConfig } from '..';

const HomePage = lazy(() => import('@/pages/home'));
const AdminPage = lazy(() => import('@/pages/admin'));
const ClientPage = lazy(() => import('@/pages/client'));

export const PrivateRoutes: RouteConfig[] = [
  {
    path: '/home',
    component: HomePage,
    acessType: [], // Acessível para todos os usuários autenticados
    private: true,
  },
  {
    path: '/admin',
    component: AdminPage,
    acessType: ['admin'], // Apenas administradores
    private: true,
  },
  {
    path: '/client',
    component: ClientPage,
    acessType: ['client', 'admin'], // Clientes e administradores
    private: true,
  },
];
