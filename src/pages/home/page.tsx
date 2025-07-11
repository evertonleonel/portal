import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  BackgroundWrapper,
} from '@/components/ui/background-image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';

export default function Home() {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="grid h-full items-center justify-center gap-4">
      <BackgroundWrapper className="bottom-0 right-0 top-[-2.563rem] max-sm:left-0">
        <BackgroundImage
          src="images/logos/logo-portal-baixada-sigla-cinza.svg"
          alt="Logo do portal Baixada"
          className="object-cover"
        />
      </BackgroundWrapper>

      <Card className="bg-background grid items-center justify-center gap-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Home</h1>
          <p className="mt-8 text-gray-600">Bem-vindo, {user?.name}!</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="mt-2 text-xs text-gray-400">
            Permissões: {user?.roles.join(', ')}
          </p>
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

        <DropdownMenu>
          <DropdownMenuTrigger>OPEN DROPDOWN</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>SubTrigger</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
    </div>
  );
}
