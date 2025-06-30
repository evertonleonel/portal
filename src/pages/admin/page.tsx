import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export default function AdminPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="mt-2 text-gray-600">Área restrita para administradores</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">Informações do Usuário</h3>
            <p className="text-blue-800">Nome: {user?.name}</p>
            <p className="text-blue-800">Email: {user?.email}</p>
            <p className="text-blue-800">Permissões: {user?.roles.join(', ')}</p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-900">Funcionalidades Admin</h3>
            <ul className="space-y-1 text-green-800">
              <li>• Gerenciar usuários</li>
              <li>• Configurações do sistema</li>
              <li>• Relatórios avançados</li>
              <li>• Logs de auditoria</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="default">Gerenciar Usuários</Button>
          <Button variant="secondary">Configurações</Button>
          <Button variant="outline">Relatórios</Button>
          <Button variant="destructive" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
