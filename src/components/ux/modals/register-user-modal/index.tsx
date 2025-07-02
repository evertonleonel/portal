import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const RegisterUserModal = () => {
  return (
    <Dialog open={true}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="modal-content-baixada">
        <DialogHeader className="modal-header-baixada">
          <DialogTitle className="text-white">Title?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-modal-baixada">aaa</DialogDescription>
        <DialogFooter className="modal-footer-baixada">Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
