import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import CustomDropdown from '@/components/custom/CustomDropdownMenu'
import LongText from '@/components/long-text'
import { callTypes } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: any = [
  {
    accessorKey: 'userHandle',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title='User Handle' />
    ),
    cell: ({ row }: any) => (
      <div className='flex items-center gap-x-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={row?.original?.profileImage} alt='profile' />
          <AvatarFallback>{`${row?.original?.firstName?.charAt(0)} ${row?.original?.lastName?.charAt(0) || ''}`}</AvatarFallback>
        </Avatar>
        <LongText>{row.original?.userHandle || ''}</LongText>
      </div>
    ),
    enableHiding: false,
  },

  {
    accessorKey: 'firstName',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }: any) => (
      <div>
        {row.original?.firstName
          ? `${row.original?.firstName || ''} ${row.original?.lastName || ''}`
          : 'N/A'}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }: any) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    cell: ({ row }: any) => <div>{row.original?.phoneNumber || 'N/A'}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }: any) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.original?.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      )
    },
    filterFn: (row: any, id: any, value: any) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: CustomDropdown,
  },
]
