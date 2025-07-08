import { TabsTrigger } from '@radix-ui/react-tabs';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { InputIcon } from '@/components/ui/input-icon';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth-context';

export default function UserApprovalRequests() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <section className="flex gap-3">
        <Icon name="documentCopy" className="text-primary" />
        <h1 className="text-primary font-semibold">Solicitações de cadastro</h1>
      </section>
      <section className="h-full w-full">
        <Tabs defaultValue="solicitacoes">
          <div className="grid w-full items-center justify-between gap-2 px-2.5 lg:flex">
            <TabsList className="flex rounded-none">
              <TabsTrigger value="solicitacoes" className="h-10">
                Solicitações
              </TabsTrigger>
              <TabsTrigger value="aprovacoes" className="h-10">
                Aprovações
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4">
              <div className="flex w-full max-w-40 flex-col gap-2">
                <Label className="font-manrope text-xs font-normal">
                  Pesquisa por usuário
                </Label>
                <InputIcon
                  icon={
                    <Icon
                      name="inputSearch"
                      className="text-muted-foreground size-4"
                    />
                  }
                  placeholder="Pesquisar"
                  className="h-10"
                />
              </div>
              <div className="flex min-w-40 flex-col gap-2">
                <Label className="font-manrope text-xs font-normal">
                  Filtrar por empresa
                </Label>
                <Select
                  onValueChange={value => {
                    console.log(value);
                  }}
                >
                  <SelectTrigger size={'sm'} className="!h-10 w-full min-w-40">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="empty" disabled>
                      Carregando...
                    </SelectItem>
                    <SelectItem value="item">Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <TabsContent value="solicitacoes">tabela solicitacao</TabsContent>
          <TabsContent value="aprovacoes">tabela aprovacao</TabsContent>
        </Tabs>
        <div className="mx-auto mt-8">
          <Button variant={'destructive'} onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </section>
    </div>
  );
}
