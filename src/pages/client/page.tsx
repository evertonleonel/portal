import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export default function ClientPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">Área do Cliente</h1>
            <p className="mt-2 text-gray-600">Portal exclusivo para clientes</p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-purple-50 p-4">
              <h3 className="mb-2 font-semibold text-purple-900">Seu Perfil</h3>
              <p className="text-purple-800">Nome: {user?.name}</p>
              <p className="text-purple-800">Email: {user?.email}</p>
              <p className="text-purple-800">Tipo: {user?.roles.join(', ')}</p>
            </div>

            <div className="rounded-lg bg-orange-50 p-4">
              <h3 className="mb-2 font-semibold text-orange-900">Serviços Disponíveis</h3>
              <ul className="space-y-1 text-orange-800">
                <li>• Consultar pedidos</li>
                <li>• Suporte técnico</li>
                <li>• Downloads</li>
                <li>• Faturas</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button variant="default">Meus Pedidos</Button>
            <Button variant="secondary">Suporte</Button>
            <Button variant="outline">Downloads</Button>
            <Button variant="destructive" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
