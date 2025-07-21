import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { mockMenu } from '../../table-menus';
import { usePreviewSubMenuModal } from '../context';
import {
  defaultValuesSubMenuModalForm,
  subMenuModalFormSchema,
  type SubMenuSubModalFormInputs,
} from '../schema';

export const useSubMenuFormModal = () => {
  const { data: menuData, isOpen, onClose } = usePreviewSubMenuModal();

  const form = useForm<SubMenuSubModalFormInputs>({
    resolver: zodResolver(subMenuModalFormSchema),
    defaultValues: defaultValuesSubMenuModalForm,
  });

  const caminho = useWatch({ control: form.control, name: 'caminho' });
  const menu = useWatch({ control: form.control, name: 'menuPrincipal' });

  const findMenu = mockMenu.find(el => el.id.toString() === menu?.id);
  const menuPath = findMenu?.caminho ?? '/';
  const inputFullPathValue = menuPath.concat(caminho);

  const onSubmit = async (inputs: SubMenuSubModalFormInputs) => {
    try {
      console.log('inputs', inputs);
    } catch (error) {
      console.error('Erro ao:', error);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    form.reset(defaultValuesSubMenuModalForm);

    if (menuData) {
      const parentMenu = mockMenu.find(menu =>
        menu.subMenus.some(sub => sub.id === menuData.id)
      );

      form.reset({
        desc: menuData.desc,
        caminho: menuData.caminho,
        menuPrincipal: {
          id: parentMenu?.id.toString(),
        },
        ordemExibicao: menuData.ordemExibicao?.toString(),
      });
    }
  }, [form, isOpen, menuData]);

  return { form, onSubmit, menuData, onClose, isOpen, inputFullPathValue };
};
