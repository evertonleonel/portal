// import { useState } from 'react';

// import { useLocation, useNavigate } from 'react-router-dom';
import {
  BackgroundImage,
  BackgroundWrapper,
} from '@/components/ui/background-image';
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ShowContent } from '@/components/ui/show-content';
// import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsSmallScreen } from '@/hooks/use-small-screen';
import { cn } from '@/utils/lib/tailwind-merge';

// import { useAuth } from '@/context/auth-context';
import { LoginForm } from './_components/forms/login';
import { RegisterForm } from './_components/forms/register';
import { ReturnForm } from './_components/forms/return';
import { SigninProvider, useSigninContext } from './context';

export default function SignIn() {
  return (
    <SigninProvider>
      <SignInContent />
    </SigninProvider>
  );
}

function SignInContent() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const { login, isLoading } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const from = location.state?.from?.pathname || '/home';

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!email || !password) {
  //     setError('Por favor, preencha todos os campos');
  //     return;
  //   }

  //   const success = await login(email, password);

  //   if (success) {
  //     navigate(from, { replace: true });
  //   } else {
  //     setError('Credenciais inválidas');
  //   }
  // };

  // const handleTestLogin = (testEmail: string) => {
  //   setEmail(testEmail);
  //   setPassword('123456');
  // };

  const { viewTabState } = useSigninContext();
  const isSmallScreen = useIsSmallScreen();

  console.log(viewTabState, 'viewTabState');
  return (
    <main className="relative grid h-full min-h-screen place-content-center p-4">
      <BackgroundWrapper className="inset-0">
        <BackgroundImage
          src="images/background.svg"
          alt="Imagem de login: trilhos de trem"
          className="object-cover"
        />
      </BackgroundWrapper>
      <ShowContent condition={!viewTabState.sucess}>
        <div className="flex-1">
          <Card className={cn('lg:w-[572px]', isSmallScreen && 'py-8')}>
            <CardHeader className="flex items-center justify-center px-8 lg:px-10">
              <picture className="max-w-sm[242px]">
                <img
                  src="/images/logos/logo-portal-baixada.svg"
                  alt="Logo Portal"
                />
              </picture>
            </CardHeader>
            <CardContent className="px-8 lg:px-10">
              <Tabs defaultValue="login" className="mx-auto">
                <TabsContent value="login">
                  <div className="mb-6 mt-8">
                    <p className="text-center font-normal text-black">
                      Bem vindo(a)!
                    </p>
                    <p className="text-baixada-neutral-600 mt-2 text-center text-sm font-normal">
                      Faça login ou solicite seu cadastro
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="cadastro">
                  <div className="mb-6 mt-8">
                    <p className="text-center font-normal text-black">
                      Solicite seu cadastro
                    </p>
                    <p className="text-baixada-neutral-600 mt-2 text-center text-sm font-normal">
                      Preencha as informações abaixo para solicitar seu cadastro
                      no Portal
                    </p>
                  </div>
                </TabsContent>
                <TabsList className="max-w-sm[351px] mx-auto flex w-full">
                  {/* <TabsTrigger value="account" className="w-full">
                Account
              </TabsTrigger> */}
                  <TabsTrigger value="login" className="h-10 w-full">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="cadastro" className="h-10 w-full">
                    Cadastro
                  </TabsTrigger>
                </TabsList>
                {/* <TabsContent value="account">
              <CardContent className="p-0">
                <div className="rounded-lg border bg-gray-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Usuários de Teste:</h3>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleTestLogin('admin@test.com')}
                      className="w-full rounded border border-blue-200 bg-blue-50 p-2 text-left text-xs text-blue-800 transition-colors hover:bg-blue-100"
                    >
                      <strong>Admin:</strong> admin@test.com (Acesso total)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTestLogin('client@test.com')}
                      className="w-full rounded border border-green-200 bg-green-50 p-2 text-left text-xs text-green-800 transition-colors hover:bg-green-100"
                    >
                      <strong>Cliente:</strong> client@test.com (Área do cliente)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTestLogin('user@test.com')}
                      className="w-full rounded border border-purple-200 bg-purple-50 p-2 text-left text-xs text-purple-800 transition-colors hover:bg-purple-100"
                    >
                      <strong>Usuário:</strong> user@test.com (Apenas home)
                    </button>
                  </div>
                </div>

                {/* Formulário */}
                {/* <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4 rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Digite seu e-mail corporativo"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Senha
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Senha"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-md border border-red-300 bg-red-50 p-3 text-center text-sm text-red-800">
                      {error}
                    </div>
                  )}

                  <div className="w-full">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? 'Entrando...' : 'Continuar Login'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </TabsContent> */}
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="cadastro">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter
              className={cn(
                'mt-12 flex items-center justify-center gap-6 px-8 lg:px-10',
                isSmallScreen && 'mt-4'
              )}
            >
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
          </Card>
        </div>
      </ShowContent>
      <ShowContent condition={viewTabState.sucess}>
        <ReturnForm />
      </ShowContent>
    </main>
  );
}
