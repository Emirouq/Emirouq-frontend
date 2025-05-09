import dayjs from 'dayjs'
import { MdDeleteOutline } from 'react-icons/md'
import LongText from '@/components/long-text'
import PostDetailsDrawer from './post-detail-view'

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
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }: any) => {
        return (
          <div className='flex flex-col'>
            <span>{row?.original?.category?.title || 'N/A'}</span>
            <span className='text-xs text-gray-400'>
              {/* {row?.original?.category?.title || ''} */}
            </span>
          </div>
        )
      },
    },

    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }: any) => {
        return (
          <p
            className='line-clamp-2 max-w-[200px]'
            title={row?.original?.description || 'N/A'}
          >
            {row?.original?.description || 'N/A'}
          </p>
        )
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }: any) => {
        return <LongText className=''>${row?.original?.price}</LongText>
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }: any) => <div>{row?.original?.location?.name}</div>,
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
      cell: ({ row }: any) => (
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
          <PostDetailsDrawer row={row} />
        </div>
      ),
      footer: (props: any) => props.column.id,
    },
  ]
}
