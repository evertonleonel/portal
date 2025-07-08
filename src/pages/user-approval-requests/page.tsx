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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth-context';

import { TableApprovals } from './_components/table-approvals';
import { TableRequests } from './_components/table-requests';

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
          <div className="grid w-full items-center justify-between gap-4 md:flex md:border-separate md:gap-0 md:border-b">
            <TabsList
              variant={'ghost'}
              className="pt-5 max-sm:border-separate max-sm:border-b"
            >
              <TabsTrigger
                variant={'ghost'}
                value="solicitacoes"
                className="mt-auto h-14 w-full pb-0 font-semibold"
              >
                <Icon name="profileTickUser" className="size-6" />
                Solicitações
              </TabsTrigger>
              <TabsTrigger
                variant={'ghost'}
                value="aprovacoes"
                className="mt-auto h-14 w-full pb-0 font-semibold"
              >
                <Icon name="profileUser" className="size-6" />
                Aprovações
              </TabsTrigger>
            </TabsList>
            <div className="flex w-full items-center gap-4 py-1.5">
              <div className="ml-auto flex w-full max-w-40 flex-col gap-2">
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
                  <Icon name="filter" />
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

          <TabsContent value="solicitacoes" className="pt-4.5">
            <TableRequests />
          </TabsContent>
          <TabsContent value="aprovacoes" className="pt-4.5">
            <TableApprovals />
          </TabsContent>
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
