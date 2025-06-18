import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TablePaginationProps {
  startIndex: number
  setStartIndex: (startIndex: number) => void
  viewPage: number
  setViewPage: (viewPage: number) => void
  totalCount: number
  visibility?: boolean
  renderCurrentPage?: any
}

const TablePagination = ({
  startIndex,
  setStartIndex,
  viewPage,
  setViewPage,
  totalCount,
  renderCurrentPage,
}: TablePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const options = [10, 25, 50, 100]

  const totalPages = Math.ceil(totalCount / viewPage)

  const handleChangePagination = (value: number) => {
    setCurrentPage(value)
    setStartIndex(viewPage * (value - 1) + 1)
  }

  const handlePageSizeChange = (value: string) => {
    const pageSize = Number(value)
    setViewPage(pageSize)
    setCurrentPage(1)
    setStartIndex(1)
  }

  useEffect(() => {
    if (renderCurrentPage) {
      setCurrentPage(1)
    }
  }, [renderCurrentPage])

  if (totalCount === 0) return null

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between md:flex-row'
      )}
    >
      <div className='flex items-center space-x-2'>
        <Label htmlFor='page-size' className='text-sm text-muted-foreground'>
          Show
        </Label>
        <Select onValueChange={handlePageSizeChange} value={String(viewPage)}>
          <SelectTrigger className='h-8 w-[80px]'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='mt-4 flex items-center space-x-4 md:mt-0'>
        <div className='shrink-0'>
          <span className='text-sm text-muted-foreground'>
            Showing {startIndex} to{' '}
            {Math.min(startIndex + viewPage, totalCount)} of {totalCount}{' '}
            records
          </span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handleChangePagination(currentPage - 1)
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - currentPage) <= 1
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={currentPage === pageNum}
                        onClick={() => handleChangePagination(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                } else if (
                  (pageNum === currentPage - 2 && currentPage > 3) ||
                  (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return null
              }
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages &&
                  handleChangePagination(currentPage + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default TablePagination
