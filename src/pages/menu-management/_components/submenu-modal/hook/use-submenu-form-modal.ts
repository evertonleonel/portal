import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { useMenuManagementContext } from '@/pages/menu-management/context';
import { patchSubMenu, postSubMenu } from '@/services/menu';
import { catchError } from '@/utils/catch-error';

import { usePreviewSubMenuModal } from '../context';
import {
  defaultValuesSubMenuModalForm,
  subMenuModalFormSchema,
  type SubMenuSubModalFormInputs,
} from '../schema';

export const useSubMenuFormModal = () => {
  const [isPending, starTransition] = useTransition();
  const { data: subMenuData, isOpen, onClose } = usePreviewSubMenuModal();
  const { menus } = useMenuManagementContext();

  const form = useForm<SubMenuSubModalFormInputs>({
    resolver: zodResolver(subMenuModalFormSchema),
    defaultValues: defaultValuesSubMenuModalForm,
  });

  const caminho = useWatch({ control: form.control, name: 'caminho' });
  const menuId = useWatch({ control: form.control, name: 'menuPrincipal' });

  const findMenu = menus.find(el => el.id.toString() === menuId);
  const menuPath = findMenu?.caminho ?? '/';
  const inputFullPathValue = menuPath.concat(caminho);

  const onSubmit = async (inputs: SubMenuSubModalFormInputs) => {
    const isUpdate = !!subMenuData;

    starTransition(async () => {
      try {
        if (isUpdate) {
          await patchSubMenu({ ...inputs, id: subMenuData.id.toString() });
          toast.success('Sub-menu editado com sucesso!');
        } else {
          await postSubMenu(inputs);
          toast.success('Sub-menu criado com sucesso!');
        }
      } catch (error) {
        catchError(error);
      }
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    form.reset(defaultValuesSubMenuModalForm);

    if (subMenuData) {
      const parentMenu = menus.find(menu =>
        menu.subMenus.some(sub => sub.id === subMenuData.id)
      );

      form.reset({
        desc: subMenuData.desc,
        caminho: subMenuData.caminho,
        menuPrincipal: parentMenu?.id.toString(),
        ordemExibicao: subMenuData.ordemExibicao?.toString(),
      });
    }
  }, [form, isOpen, subMenuData]);

  return {
    form,
    onSubmit,
    subMenuData,
    onClose,
    isOpen,
    inputFullPathValue,
    isPending,
  };
};
