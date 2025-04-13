import dayjs from 'dayjs'
import { MdDeleteOutline } from 'react-icons/md'
import LongText from '@/components/long-text'

export const columns: any = () => {
  return [
    {
      accessorKey: 'Sr No.',
      header: 'Sr No.',
      cell: ({ row }: any) => {
        return <LongText className=''>{row?.index + 1}</LongText>
      },
    },
    ,
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }: any) => {
        return <LongText className=''>{row?.original?.title}</LongText>
      },
    },

    {
      accessorKey: 'createdAt',
      header: 'Posted On',
      cell: ({ row }: any) => (
        <div>{dayjs(row?.original?.createdAt).format('MMM-DD-YYYY')}</div>
      ),
    },
    {
      accessorKey: 'actions',
      header: () => {
        return <div className='flex items-center justify-start'>Action</div>
      },
      cell: () => (
        <div className='relative flex gap-2'>
          <div className='custom-popconfirm'>
            <span
              onClick={(e) => {
                e?.stopPropagation()
              }}
            >
              <MdDeleteOutline className='cursor-pointer text-lg text-red-500' />
            </span>
          </div>
          {/* <PostDetailsDrawer row={row} /> */}
        </div>
      ),
      footer: (props: any) => props.column.id,
    },
  ]
}
