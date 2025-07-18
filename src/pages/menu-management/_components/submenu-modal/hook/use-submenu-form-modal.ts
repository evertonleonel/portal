import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
      form.reset({
        desc: menuData.desc,
        caminho: menuData.caminho,
      });
    }
  }, [form, isOpen, menuData]);

  return { form, onSubmit, menuData, onClose, isOpen };
};
