import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

export const AcessDeniedPage = ({ requiredRoles }: { requiredRoles: string[] }) => {
  const { user } = useAuth();
  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <Icon name="error" />
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Acesso Negado</h2>
      <p className="mb-4 text-gray-600">Você não tem permissão para acessar esta página.</p>
      <div className="mb-4 text-sm text-gray-500">
        <p>Usuário: {user?.name}</p>
        <p>Permissões necessárias: {requiredRoles.join(', ')}</p>
        <p>Suas permissões: {user?.roles.join(', ')}</p>
      </div>
      <Button onClick={() => window.history.back()}>Voltar</Button>
    </div>
  );
};
