import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { usePreviewMenuModal } from '@/pages/menu-management/context/menu-modal';

import {
  defaultValuesModalForm,
  type MenuModalFormInputs,
  menuModalFormSchema,
} from '../schema';

export const useMenuFormModal = () => {
  const { data: menuData, isOpen, onClose } = usePreviewMenuModal();

  const form = useForm<MenuModalFormInputs>({
    resolver: zodResolver(menuModalFormSchema),
    defaultValues: defaultValuesModalForm,
  });

  const onSubmit = async (inputs: MenuModalFormInputs) => {
    try {
      console.log('inputs', inputs);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    form.reset(defaultValuesModalForm);

    if (menuData) {
      form.reset({
        desc: menuData.desc,
        caminho: menuData.caminho,
      });
    }
  }, [form, isOpen, menuData]);

  return { form, onSubmit, menuData, onClose, isOpen };
};
