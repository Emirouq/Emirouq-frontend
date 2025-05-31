import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LongText from '@/components/long-text'

export const columns: any = () => {
  const intervals: any = {
    day: 'Day',
    week: 'Week',
    month: 'Month',
    year: 'Year',
  }
  return [
    {
      accessorKey: 'Sr No.',
      header: 'Sr No.',
      cell: ({ row }: any) => {
        return <LongText className=''>{row?.index + 1}</LongText>
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }: any) => {
        return (
          <LongText className=''>{`${row?.original?.customer?.firstName} ${row?.original?.customer?.lastName}`}</LongText>
        )
      },
    },

    {
      accessorKey: 'title',
      header: 'Title',
      // cell: ({ row }: any) => <div>${row?.original?.amount}</div>,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }: any) => (
        <div className='lime-clamp-2 max-w-[200px]'>
          {row?.original?.description}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <div>{row?.original?.isResponded ? 'Closed' : 'Open'}</div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }: any) => (
        <div>{dayjs(row?.original?.createdAt).format('DD/MM/YYYY')}</div>
      ),
    },

    {
      accessorKey: 'actions',
      header: () => {
        return <div className='flex items-center justify-start'>Action</div>
      },
      cell: ({ row }: any) => (
        <div className='relative flex gap-2'>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant='outline'>Respond</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Respond to Ticket</DialogTitle>
                  <DialogDescription>
                    Send an appropriate response to user with a descriptive
                    message below.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4'>
                  <div className='grid gap-3'>
                    <Label htmlFor='name-1'>Message</Label>
                    <Input id='name-1' name='name' defaultValue='Hi there!' />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant='outline'>Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      console.log('row?.original', row?.original.uuid)
                    }}
                  >
                    Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      ),
      footer: (props: any) => props.column.id,
    },
  ]
}
