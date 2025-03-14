import { useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { Pencil } from 'lucide-react'
import { CiEdit } from 'react-icons/ci'
import { FaChevronRight } from 'react-icons/fa6'
import { MdDeleteOutline } from 'react-icons/md'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LongText from '@/components/long-text'

export const columns: any = ({
  open,
  setOpen,
  editId,
  setEditId,
  setTitle,
  setLogo,
  setProperties,
}: any) => {
  const navigate = useNavigate()
  return [
    {
      accessorKey: 'Sr No.',
      header: 'Sr No.',
      cell: ({ row, idx }: any) => {
        return <LongText className=''>{row?.index + 1}</LongText>
      },
    },
    ,
    {
      accessorKey: 'Category Name',
      header: 'Category Name',
      cell: ({ row }: any) => {
        return <LongText className=''>{row?.original?.title}</LongText>
      },
    },

    {
      accessorKey: 'logo',
      header: 'Category Logo',
      cell: ({ row }: any) => (
        <div className='text-nowrap'>
          <Avatar>
            <AvatarImage src={row?.original?.logo} />
            <AvatarFallback>{row?.original?.title?.charAt(0)}</AvatarFallback>
          </Avatar>
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
              setTitle(row?.original?.title)
              setLogo({ url: row?.original?.logo, file: '' })
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
          <span
            onClick={(e) => {
              // e?.stopPropagation()
              navigate({
                to: `/categories/subCategory?categoryId=${row?.original?.uuid}`,
              })
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
