import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const PaginationComponent = ({
  startIndex,
  currentPage,
  totalCount,
  setStartIndex,
  setCurrentPage,
  setPrev,
}: any) => {
  const [page, setPage] = useState(0)
  const [isPopover, setIsPopover] = useState(false)
  useEffect(() => {
    //total count in page
    const totalCountPage = 10
    let totalPages = Math.floor(totalCount / totalCountPage)
    const pageLeft = totalCount % totalCountPage

    if (pageLeft > 0) {
      totalPages++
    }

    setPage(totalPages)
  }, [totalCount])
  return (
    <div>
      <Pagination className='flex justify-end'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className='cursor-pointer'
              onClick={() => {
                // table.previousPage();
                if (startIndex > 0) {
                  setStartIndex(startIndex - 10)
                  setCurrentPage(currentPage - 1)
                }
              }}
            />
          </PaginationItem>
          {/* {Array.from({ length: page <= 3 ? page : 3 }).map((__, index) => ( */}
          <PaginationItem>
            <PaginationLink
              className='cursor-pointer'
              isActive={true}
              onClick={() => {
                // setStartIndex(index * 10);
                // setCurrentPage(index);
              }}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
          {/* ))} */}

          <Popover>
            <PopoverTrigger asChild>
              {page > 5 && (
                <PaginationItem>
                  <PaginationEllipsis
                    onClick={() => {
                      setIsPopover(!isPopover)
                    }}
                  />
                </PaginationItem>
              )}
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='grid gap-4'></div>
            </PopoverContent>
          </Popover>
          <PaginationItem className='cursor-pointer'>
            <PaginationNext
              onClick={() => {
                if (startIndex + 10 > totalCount ? false : true) {
                  setStartIndex(startIndex + 10)
                  setPrev(currentPage)
                  setCurrentPage(currentPage + 1)
                }
              }}
            />
          </PaginationItem>
          <div>
            <span className='pr-2 text-xs font-medium capitalize'>out of</span>
            {Math.ceil(totalCount / 10)}
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationComponent
