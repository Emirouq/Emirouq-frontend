import dayjs from 'dayjs'
import LongText from '@/components/long-text'
import RespondTicket from './respond-ticket-modal'

export const columns: any = () => {
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
        <div>{row?.original?.responded ? 'Closed' : 'Open'}</div>
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
      cell: ({ row }: any) =>
        !row?.original?.responded ? (
          <div className='relative flex gap-2'>
            <RespondTicket id={row.original.uuid} />
          </div>
        ) : (
          <div>Responded</div>
        ),
      footer: (props: any) => props.column.id,
    },
  ]
}
