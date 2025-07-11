import { memo } from 'react';

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

import { useUserApprovalRequestsContext } from '../../context';

export const SearchFilters = memo(() => {
  const { empresas, isLoadingEmpresas, handleFilterNome, handleFilterEmpresa } =
    useUserApprovalRequestsContext();

  return (
    <div className="flex w-full items-center gap-4 px-5 py-1.5 lg:px-0">
      <div className="ml-auto flex w-full max-w-40 flex-col gap-2">
        <Label className="font-manrope text-xs font-normal">
          Pesquisa por usuário
        </Label>
        <InputIcon
          icon={
            <Icon name="inputSearch" className="text-muted-foreground size-4" />
          }
          placeholder="Pesquisar"
          className="h-10"
          onChange={e => handleFilterNome(e.target.value)}
        />
      </div>
      <div className="flex min-w-40 flex-col gap-2 self-end">
        <Label className="font-manrope text-xs font-normal">
          <Icon name="filter" />
          Filtrar por empresa
        </Label>
        <Select onValueChange={value => handleFilterEmpresa({ id: value })}>
          <SelectTrigger size={'sm'} className="!h-10 w-full min-w-40">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent>
            {isLoadingEmpresas ? (
              <SelectItem value="empty" disabled>
                Carregando...
              </SelectItem>
            ) : empresas.length === 0 ? (
              <SelectItem value="empty" disabled>
                Nenhuma empresa encontrada
              </SelectItem>
            ) : (
              <>
                <SelectItem value="undefined">TODAS</SelectItem>
                {empresas.map(empresa => (
                  <SelectItem key={empresa.id} value={empresa.id.toString()}>
                    {empresa.nome}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});

SearchFilters.displayName = 'SearchFilters';
