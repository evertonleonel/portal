import { lazy } from 'react';

import type { RouteConfig } from '..';
const SignIn = lazy(() => import('@/pages/auth/signin/page'));

export const PublicRoutes: RouteConfig[] = [
  {
    path: '/',
    component: SignIn,
    acessType: [],
    private: false,
  },
  {
    path: '/signin',
    component: SignIn,
    acessType: [],
    private: false,
  },
];
