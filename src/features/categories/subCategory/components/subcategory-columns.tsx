import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  setEditDetails,
  setDeleteModal,
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
      accessorKey: 'logo',
      header: 'Category Logo',
      cell: ({ row }: any) => (
        <div className=''>
          <Avatar>
            <AvatarImage src={row?.original?.logo} />
            <AvatarFallback>{row?.original?.title?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      accessorKey: 'properties',
      header: 'No. of Properties',
      cell: ({ row }: any) => (
        <div className='text-nowrap'>
          {row?.original?.properties?.length
            ? row?.original?.properties
                ?.map((item: any) => item?.label)
                .join(', ')
            : '--'}
        </div>
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
                  setEditDetails(row?.original)
                }}
              >
                Edit
                <DropdownMenuShortcut>
                  <IconEdit size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={(e) => {
                  e?.stopPropagation()
                  setDeleteModal(row?.original?.uuid)
                }}
                className='!text-red-500'
              >
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
