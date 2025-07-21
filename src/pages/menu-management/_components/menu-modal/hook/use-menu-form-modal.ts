import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { patchMenu, postMenu } from '@/services/menu';
import { catchError } from '@/utils/catch-error';

import { usePreviewMenuModal } from '../context';
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
    const isUpdate = !!menuData;

    try {
      if (isUpdate) {
        await patchMenu({ ...inputs, id: menuData.id.toString() });
        toast.success('Menu editado com sucesso!');
      } else {
        await postMenu(inputs);
        toast.success('Menu criado com sucesso!');
      }
    } catch (error) {
      catchError(error);
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
