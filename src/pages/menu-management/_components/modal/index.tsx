import { Button } from '@/components/ui/button';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from '@/components/ui/modal';

interface MenuModalProps {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
}

export const MenuModal = ({ isOpen, loading, onClose }: MenuModalProps) => {
  return (
    <Modal variant={'baixada'} isOpen={isOpen} onClose={onClose}>
      <ModalTitle>titulo</ModalTitle>
      <ModalContent>aaaa</ModalContent>
      <ModalFooter>
        <Button
          className="cursor-pointer"
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="cursor-pointer"
          disabled={loading}
          onClick={() => console.log('')}
        >
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};
