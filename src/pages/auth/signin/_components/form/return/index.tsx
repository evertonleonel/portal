import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const ReturnForm = () => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate('/signin');
  }
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4">
      <Icon name="notification-success" />
      <p className="text-baixada-dark-blue-950 text-base">Solicitação enviada!</p>
      <div className="text-baixada-neutral-600 grid text-sm font-normal">
        <p> Sua solicitação de cadastro no Portal da Baixada foi enviado.</p>
        <p>
          Após aprovação {''}
          <strong className="text-baixada-neutral-600">você receberá um e-mail de confirmação.</strong>
        </p>
      </div>
      <Button className="mt-12 w-full" onClick={handleNavigate}>
        Voltar para o login
      </Button>
    </div>
  );
};
