import dayjs from 'dayjs'
import { FaChevronRight } from 'react-icons/fa6'
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
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }: any) => {
        return <LongText className=''>{row?.original?.category}</LongText>
      },
    },

    {
      accessorKey: 'description',
      header: 'Description',
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
                // setIsPopoverVisible(row?.original?._id)
              }}
            >
              <MdDeleteOutline className='cursor-pointer text-lg text-red-500' />
            </span>
            {/* {isPopoverVisible === row?.original?._id && (
                  <div
                    style={{
                      zIndex: 9999,
                    }}
                  >
                    <div
                      className="popover w-72"
                      style={{
                        position: "absolute",
                        right: "0%",
                      }}
                    >
                      <p className="pb-2 text-gray-500 font-[500]">
                        Are you sure you want to delete this?
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end ",
                        }}
                      >
                        <Button
                          size={"sm"}
                          variant={"secondary"}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onDeleteCourse(row?.original?._id);
                          }}
                          className=""
                        >
                          Yes
                        </Button>
                        <Button
                          size={"sm"}
                          variant="default"
                          onClick={(e) => {
                            e?.stopPropagation();
                            setIsPopoverVisible("");
                          }}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                  </div>
                )} */}
          </div>
          <span
            onClick={() => {
              // e?.stopPropagation()
              // navigate({
              //   to: `/categories/subCategory?categoryId=${row?.original?.uuid}`,
              // })
            }}
          >
            <FaChevronRight className='cursor-pointer text-blue-600' />
          </span>
        </div>
      ),
      footer: (props: any) => props.column.id,
    },
  ]
}
