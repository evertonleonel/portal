import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { AcessDeniedPage } from '@/pages/acess-dained';

interface PermissionRouteProps {
  children: ReactNode;
  requiredRoles: string[];
}

export const PermissionRoute = ({ children, requiredRoles }: PermissionRouteProps) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!hasPermission(requiredRoles)) {
    // Página de acesso negado ou redirecionar para uma rota padrão
    return <AcessDeniedPage requiredRoles={requiredRoles} />;
  }

  return children;
};
