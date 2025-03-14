import dayjs from 'dayjs'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import LongText from '@/components/long-text'

export const columns: any = ({
  open,
  setOpen,
  editId,
  setEditId,
  setProperties,
  form,
}: any) => {
  return [
    {
      accessorKey: 'Sr No.',
      header: 'Sr No.',
      cell: ({ row, idx }: any) => {
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
      cell: ({ row }: any) => (
        <div className='relative flex gap-2'>
          <span
            onClick={(e) => {
              e?.stopPropagation()
              setOpen(true)
              setEditId(row?.original?.uuid)
              setProperties(row?.original?.properties)
              console.log('row?.original?.title', row?.original?.title)
              form.setValue('title', row?.original?.title)
            }}
          >
            <CiEdit className='cursor-pointer text-lg text-blue-600' />
          </span>

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
        </div>
      ),
      footer: (props: any) => props.column.id,
    },
  ]
}
