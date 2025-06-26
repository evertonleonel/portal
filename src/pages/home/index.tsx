import { useNavigate } from 'react-router-dom';

import { BackgroundImage, BackgroundImageRoot } from '@/components/ui/background-image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="grid h-full items-center justify-center gap-4">
      <BackgroundImageRoot className="bottom-0 right-0 top-[-2.563rem] max-sm:left-0">
        <BackgroundImage
          src="images/logos/logo-portal-baixada-sigla-cinza.svg"
          alt="Logo do portal Baixada"
          className="object-cover"
        />
      </BackgroundImageRoot>
      <div className="grid items-center justify-center gap-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Home</h1>
          <p className="mt-8 text-gray-600">Bem-vindo, {user?.name}!</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="mt-2 text-xs text-gray-400">Permissões: {user?.roles.join(', ')}</p>
        </div>

        <div className="mb-8 grid w-full max-w-md grid-cols-1 gap-4 md:grid-cols-2">
          {/* Área do Cliente - Visível para clients e admins */}
          {hasPermission(['client', 'admin']) && (
            <Button
              variant="default"
              onClick={() => navigate('/client')}
              className="flex h-20 flex-col items-center justify-center"
            >
              <div className="text-lg font-semibold">Área do Cliente</div>
              <div className="text-sm opacity-80">Pedidos e Suporte</div>
            </Button>
          )}

          {/* Painel Admin - Visível apenas para admins */}
          {hasPermission(['admin']) && (
            <Button
              variant="secondary"
              onClick={() => navigate('/admin')}
              className="flex h-20 flex-col items-center justify-center"
            >
              <div className="text-lg font-semibold">Painel Admin</div>
              <div className="text-sm opacity-80">Gerenciamento</div>
            </Button>
          )}
        </div>

        <div className="mx-auto mt-8">
          <Button variant={'destructive'} onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
