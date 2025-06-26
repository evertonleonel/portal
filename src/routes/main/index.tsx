import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { createRouteElements } from '../route';

export const MainRoutes = () => {
  const routes = createRouteElements();

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
