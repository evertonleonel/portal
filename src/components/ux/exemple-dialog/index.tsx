import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          Abrir Modal
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Você tem certeza que quer realizar esta ação? Esta operação não poderá
          ser desfeita.
        </DialogDescription>
        <div className="mt-4">
          {/* Pode colocar conteúdo adicional aqui */}
          <p>Exemplo de conteúdo adicional no modal.</p>
        </div>
        <DialogFooter>
          <button className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
            Cancelar
          </button>
          <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Confirmar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
