import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import LongText from '@/components/long-text'

export const columns: any = ({
  setOpen,
  setEditId,
  setProperties,
  form,
}: any) => {
  return [
    {
      accessorKey: 'Sr No.',
      header: 'Sr No.',
      cell: ({ row }: any) => {
        return <LongText className=''>{row?.index + 1}</LongText>
      },
    },
    {
      accessorKey: 'Name',
      header: 'Name',
      cell: ({ row }: any) => {
        return <LongText className=''>{row?.original?.title}</LongText>
      },
    },

    {
      accessorKey: 'properties',
      header: 'No. of Properties',
      cell: ({ row }: any) => (
        <div className='text-nowrap'>
          {row?.original?.properties?.length > 4
            ? `${row?.original?.properties?.slice(0, 4)?.join(', ')} ...`
            : row?.original?.properties?.join(', ') || ''}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }: any) => (
        <div>{dayjs(row?.original?.createdAt).format('MMM-DD-YYYY')}</div>
      ),
    },

    {
      accessorKey: 'actions',
      header: () => {
        return <div className='flex items-center justify-start'>Action</div>
      },
      cell: ({ row }: any) => {
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
                onClick={(e) => {
                  e?.stopPropagation()
                }}
              >
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
              <DropdownMenuItem
                onClick={(e) => {
                  e?.stopPropagation()
                  setOpen(true)
                  setEditId(row?.original?.uuid)
                  setProperties(row?.original?.properties)
                  console.log('row?.original?.title', row?.original?.title)
                  form.setValue('title', row?.original?.title)
                }}
              >
                Edit
                <DropdownMenuShortcut>
                  <IconEdit size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}} className='!text-red-500'>
                Delete
                <DropdownMenuShortcut>
                  <IconTrash size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },

      footer: (props: any) => props.column.id,
    },
  ]
}
