import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { useIsSmallScreen } from '@/hooks/use-small-screen';
import { cn } from '@/utils/lib/tailwind-merge';

import { useSigninContext } from '../../../context';
import { LogoFooter } from '../../logo-footer';

export const ReturnForm = () => {
  const { handleUpdateViewForm } = useSigninContext();
  const isSmallScreen = useIsSmallScreen();

  return (
    <div className="flex-1">
      <Card
        className={cn(
          'mx-auto w-full max-w-[572px] p-6 md:p-8 lg:p-10',
          isSmallScreen && 'py-2 md:py-6 lg:py-6'
        )}
      >
        <div
          className={cn(
            'my-8 sm:my-10 md:my-12 lg:my-[54px]',
            isSmallScreen && 'my-4 sm:my-4 md:my-4 lg:my-2'
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-10 py-3 sm:gap-12 sm:py-5 md:gap-14 md:py-7 lg:gap-16 lg:py-9',
              isSmallScreen && 'gap-4 sm:gap-4 md:gap-6 lg:gap-6'
            )}
          >
            <CardHeader className="flex items-center justify-center p-0">
              <picture className="max-w-52 lg:max-w-[242px]">
                <img
                  src="/images/logos/logo-portal-baixada.svg"
                  alt="Logo Portal"
                />
              </picture>
            </CardHeader>
            <CardContent className="flex w-full flex-col items-center justify-center gap-4">
              <Icon name="notificationSucces" />
              <p className="text-baixada-dark-blue-950 text-base">
                Solicitação enviada!
              </p>
              <div className="text-surface grid text-sm font-normal">
                <p>
                  Sua solicitação de cadastro no Portal da Baixada foi enviado.
                </p>
                <p>
                  Após aprovação {''}
                  <strong className="text-surface">
                    você receberá um e-mail de confirmação.
                  </strong>
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
              <LogoFooter />
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};
