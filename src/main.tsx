import './theme/index.ts';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMSW } from './_msw';
import { AuthProvider } from './context/auth-context';
import { MainRoutes } from './routes/main';

enableMSW().then(() => {
  // Vai verificar se o ambiente é de teste
  // Se for, vai iniciar o MSW e ligar os mocks
  // Se não for, vai renderizar o app normalmente
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </StrictMode>
  );
});
