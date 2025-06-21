import { useMemo, useState } from 'react'
import {
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TablePagination from '@/components/custom/Pagination'
import TableLoading from '@/components/custom/tableLoading'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

export function SupportTable({
  columns,
  data,
  isFetching,
  viewPage,
  setViewPage,
  startIndex,
  setStartIndex,
}: any) {
  const [_____, setRowSelection] = useState({})
  const [____, setColumnVisibility] = useState<VisibilityState>({})
  const [___, setColumnFilters] = useState<ColumnFiltersState>([])
  const [__, setSorting] = useState<SortingState>([])

  const [_] = useState<Number | any>()

  const table = useReactTable({
    data: useMemo(() => data?.data || [], [data?.data]),
    columns: columns || [],
    // state: {
    //   sorting,
    //   columnVisibility,
    //   rowSelection,
    //   columnFilters,
    // },
    // enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  //   <Accordion type='single' className='border-none' collapsible>
  //   <AccordionItem value='item-1'>
  //     <AccordionTrigger>
  //       {' '}
  //       <TableRow
  //         key={row.id}
  //         data-state={row.getIsSelected() && 'selected'}
  //         className='group/row'
  //       >
  //         {row.getVisibleCells().map((cell) => (
  //           <TableCell
  //             key={cell.id}
  //             className={
  //               cell.column.columnDef.meta?.className ?? ''
  //             }
  //           >
  //             {flexRender(
  //               cell.column.columnDef.cell,
  //               cell.getContext()
  //             )}
  //           </TableCell>
  //         ))}
  //       </TableRow>
  //     </AccordionTrigger>
  //     <AccordionContent>
  //       Yes. It adheres to the WAI-ARIA design pattern.
  //     </AccordionContent>
  //   </AccordionItem>
  // </Accordion>
  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ''}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableLoading columns={columns} viewPage={5} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group/row'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ height: 50 }}
                      className={cell.column.columnDef.meta?.className ?? ''}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        totalCount={data?.count}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        viewPage={viewPage}
        setViewPage={setViewPage}
      />
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}
