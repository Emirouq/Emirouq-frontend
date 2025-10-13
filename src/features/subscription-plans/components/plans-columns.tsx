import { toCurrency } from '@/utils/to-currency'
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
        return <LongText className=''>{row?.original?.name}</LongText>
      },
    },

    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => <div>{toCurrency(row?.original?.amount)}</div>,
    },
    {
      accessorKey: 'numberOfAds',
      header: 'Number of Ads',
      cell: ({ row }: any) => <div>{row?.original?.numberOfAds}</div>,
    },
    {
      accessorKey: 'interval',
      header: 'Interval',
      cell: ({ row }: any) => <div>{intervals[row?.original?.interval]}</div>,
    },
    {
      accessorKey: 'interval_count',
      header: 'No. of Interval',
      cell: ({ row }: any) => <div>{row?.original?.interval_count}</div>,
    },
    {
      accessorKey: 'featuredAdBoost',
      header: 'Featured Ad boost',
      cell: ({ row }: any) => <div>{row?.original?.featuredAdBoosts}</div>,
    },
    {
      accessorKey: 'isVerifiedBadge',
      header: 'Verified Bage',
      cell: ({ row }: any) => (
        <div>{row?.original?.isVerifiedBadge == true ? 'True' : 'False'}</div>
      ),
    },
    {
      accessorKey: 'premiumSupport',
      header: 'Premium Support',
      cell: ({ row }: any) => (
        <div>{row?.original?.premiumSupport == true ? 'True' : 'False'}</div>
      ),
    },
    {
      accessorKey: 'prioritySupport',
      header: 'Priority Support',
      cell: ({ row }: any) => (
        <div>{row?.original?.prioritySupport == true ? 'True' : 'False'}</div>
      ),
    },
    // {
    //   accessorKey: 'actions',
    //   header: () => {
    //     return <div className='flex items-center justify-start'>Action</div>
    //   },
    //   cell: () => (
    //     <div className='relative flex gap-2'>
    //       <div className='custom-popconfirm'>
    //         <span
    //           onClick={(e) => {
    //             e?.stopPropagation()
    //           }}
    //         >
    //           <MdDeleteOutline className='cursor-pointer text-lg text-red-500' />
    //         </span>
    //       </div>
    //       {/* <PostDetailsDrawer row={row} /> */}
    //     </div>
    //   ),
    //   footer: (props: any) => props.column.id,
    // },
  ]
}
