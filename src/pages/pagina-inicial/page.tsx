import {
  BackgroundImage,
  BackgroundWrapper,
} from '@/components/ui/background-image';
import { useAuth } from '@/context/auth-context';
import { useIsSmallScreen } from '@/hooks/use-small-screen';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useAuth();

  const isSmallScreen = useIsSmallScreen();
  return (
    <div className="relative grid h-full">
      <BackgroundWrapper className="bottom-0 right-0 top-[-2.563rem] max-sm:left-0">
        <BackgroundImage
          src="images/logos/logo-portal-baixada-sigla-cinza.svg"
          alt="Logo do portal Baixada"
          className="object-cover"
        />
      </BackgroundWrapper>

      <div
        className={cn(
          'space-y-[50px] px-2 pt-24 md:pl-4 lg:pl-6',
          isSmallScreen && 'space-y-8 pt-4'
        )}
      >
        <img src="images/logos/logo-portal-baixada.svg" />
        <div className="text-primary space-y-6">
          <p className="text-xl font-medium lg:text-2xl">Olá, {user?.name}</p>
          <section className="text-3xl font-medium md:text-4xl lg:text-[46px]">
            <p>Bem vindo(a),</p>
            <p>ao Portal da Baixada!</p>
          </section>
          <section className="text-popover-foreground md:text-lg lg:text-xl">
            <p>Aqui você encontra todas as informações que precisa</p>
            <p>
              em um só lugar! Navegue pelas páginas através do menu lateral.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
