import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ConfirmDeleteProps = {
  open: boolean
  setOpen: any
  onConfirm: () => void
  loading?: boolean
}

export function ConfirmDelete({
  open,
  setOpen,
  onConfirm,
  loading,
}: ConfirmDeleteProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[420px]'>
        <DialogHeader>
          <DialogTitle className='text-red-600'>Delete Category?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <Button variant='destructive' onClick={onConfirm}>
            {loading ? <span className='ml-2'>Deleting...</span> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
