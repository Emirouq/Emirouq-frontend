import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

type DeleteConfirmationModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  trigger?: ReactNode
  title?: string
  description?: string
  onConfirm: () => void | Promise<void>
  loading?: boolean
}

export default function DeleteConfirmationModal({
  open,
  setOpen,
  trigger,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  onConfirm,
  loading = false,
}: DeleteConfirmationModalProps) {
  const handleConfirm = async () => {
    await onConfirm()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </DialogHeader>
        <DialogFooter className='gap-2'>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
