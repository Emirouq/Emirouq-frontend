import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

const TableLoading = ({
  columns,
  viewPage,
}: {
  columns: any
  viewPage: number
}) => {
  return (
    <TableRow>
      {columns?.map((_: any, index: number) => (
        <TableCell key={index} className='w-auto'>
          {[...Array(viewPage)].map((_, idx) => (
            <Skeleton key={idx} className='mt-3 h-8' />
          ))}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default TableLoading
