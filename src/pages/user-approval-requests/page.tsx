import { Icon } from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AprovacaoModal } from './_components/modals/aprovacao-modal';
import { JustificarSolicitacaoModal } from './_components/modals/justificar-solicitacao-modal';
import { SearchFilters } from './_components/search-filters';
import { TableApprovals } from './_components/table-approvals';
import { TableRequests } from './_components/table-requests';
import {
  UserApprovalRequestsProvider,
  useUserApprovalRequestsContext,
} from './context';

export default function UserApprovalRequests() {
  return (
    <UserApprovalRequestsProvider>
      <UserApprovalRequestsContent />
    </UserApprovalRequestsProvider>
  );
}

const UserApprovalRequestsContent = () => {
  const {
    approveModal,
    handleOpenApproveModal,
    usuarioApprove,
    handleOpenJustificationModal,
    justificationModal,
  } = useUserApprovalRequestsContext();
  return (
    <div className="flex h-full flex-col gap-8">
      <section className="flex gap-3">
        <Icon name="documentCopy" className="text-primary" />
        <h1 className="text-primary font-semibold">Solicitações de cadastro</h1>
      </section>
      <section className="h-full w-full">
        <Tabs defaultValue="solicitacoes">
          <div className="md:border-table grid w-full items-center justify-between gap-4 md:flex md:gap-0 md:border-b">
            <TabsList
              variant={'ghost'}
              className="max-md:border-table pt-5 max-md:border-b"
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
            <SearchFilters />
          </div>

          <TabsContent value="solicitacoes" className="pt-4.5">
            <TableRequests />
          </TabsContent>
          <TabsContent value="aprovacoes" className="pt-4.5">
            <TableApprovals />
          </TabsContent>
        </Tabs>
      </section>

      <AprovacaoModal
        isOpen={approveModal}
        usuario={usuarioApprove}
        onOpenChange={handleOpenApproveModal}
      />

      <JustificarSolicitacaoModal
        isOpen={justificationModal}
        usuario={usuarioApprove}
        onOpenChange={handleOpenJustificationModal}
      />
    </div>
  );
};
