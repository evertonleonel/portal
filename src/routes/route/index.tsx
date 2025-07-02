import { type ComponentType } from 'react';

import { PermissionRoute } from '@/routes/guards/permission-route';
import { ProtectedRoute } from '@/routes/guards/protected-route';
import { PublicRoute } from '@/routes/guards/public-route';

import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';

export type RouteConfig = {
  path: string;
  component: ComponentType;
  acessType: string[];
  private: boolean;
};

export const routeConfigs: RouteConfig[] = [...PrivateRoutes, ...PublicRoutes];

export const createRouteElements = () =>
  routeConfigs.map(config => ({
    ...config,
    element: config.private ? (
      config.acessType.length > 0 ? (
        <ProtectedRoute>
          <PermissionRoute requiredRoles={config.acessType}>
            <config.component />
          </PermissionRoute>
        </ProtectedRoute>
      ) : (
        <ProtectedRoute>
          <config.component />
        </ProtectedRoute>
      )
    ) : (
      <PublicRoute>
        <config.component />
      </PublicRoute>
    ),
  }));
