import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

import { useSigninContext } from '../../../context';

export const ReturnForm = () => {
  const { handleUpdateViewForm } = useSigninContext();
  return (
    <div className="flex-1">
      <Card className="lg:w-lg mx-auto w-full max-w-lg p-6 md:p-8 lg:p-10">
        <div className="my-8 sm:my-10 md:my-12 lg:my-[54px]">
          <div className="flex flex-col gap-10 py-3 sm:gap-12 sm:py-5 md:gap-14 md:py-7 lg:gap-16 lg:py-9">
            <CardHeader className="flex items-center p-0">
              <picture className="max-w-52 lg:max-w-[242px]">
                <img src="/images/logos/logo-portal-baixada.svg" alt="Logo Portal" />
              </picture>
            </CardHeader>
            <CardContent className="flex w-full flex-col items-center justify-center gap-4">
              <Icon name="notification-success" />
              <p className="text-baixada-dark-blue-950 text-base">Solicitação enviada!</p>
              <div className="text-baixada-neutral-600 grid text-sm font-normal">
                <p> Sua solicitação de cadastro no Portal da Baixada foi enviado.</p>
                <p>
                  Após aprovação {''}
                  <strong className="text-baixada-neutral-600">você receberá um e-mail de confirmação.</strong>
                </p>
              </div>
            </CardContent>
            <Button
              className="w-full"
              onClick={() =>
                handleUpdateViewForm({
                  sucess: false,
                })
              }
            >
              Voltar para o login
            </Button>
            <CardFooter className="flex items-center justify-center gap-6">
              <picture>
                <img src="/images/logos/logo-mrs.svg" alt="Logo MRS" />
              </picture>
              <picture>
                <img src="/images/logos/logo-fips.svg" alt="Logo FIPS" />
              </picture>
              <picture>
                <img src="/images/logos/logo-rumo.svg" alt="Logo RUMO" />
              </picture>
              <picture>
                <img src="/images/logos/logo-vli.svg" alt="Logo VLI" />
              </picture>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};
