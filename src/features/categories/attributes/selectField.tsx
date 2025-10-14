'use client'

import { useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useAddAttributeOptions,
  useDeleteAttributeOptions,
  useUpdateAttributeOptions,
} from '@/hooks/Attributes/mutation'
import {
  useGetAttributeOptions,
  useGetAttributeOptionsForParent,
} from '@/hooks/Attributes/query'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Spinner from '@/components/custom/spin'

export const SelectField = ({
  attributeId,
  dependsOn,
  label,
  parentId,
}: any) => {
  const updateOptions = useUpdateAttributeOptions()
  const deleteOption = useDeleteAttributeOptions()
  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState('')
  const [editingOption, setEditingOption] = useState<string | null>(null)
  const [editedValue, setEditedValue] = useState<string>('')
  const {
    data: attributeOptions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  }: any = useGetAttributeOptions({
    attributeId,
    dependsOn,
    keyword,
  })
  const options = attributeOptions?.pages.flatMap((p: any) => p.data)
  const totalCount = attributeOptions?.pages?.[0]?.count

  const { data: attributeList }: any = useGetAttributeOptionsForParent({
    parentId,
    keyword: search,
    dependsOn,
  })
  const [showAddModal, setShowAddModal] = useState({
    open: false,
    value: '',
  } as any)
  const [deleteTarget, setDeleteTarget] = useState<any>({
    value: '',
    id: '',
  })

  const addAttributeOptions = useAddAttributeOptions()

  const containerRef = useRef<HTMLDivElement>(null)

  // Infinite scrolling handler
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container || !hasNextPage || isFetchingNextPage) return

      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchNextPage()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container || !hasNextPage || isFetchingNextPage) return

      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchNextPage()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const onOptionUpdate = ({ value, attributeId }: any) => {
    updateOptions
      .mutateAsync({
        body: {
          value,
        },
        pathParams: {
          attributeId,
        },
      })
      .then(() => {
        //it is needed, coz this component is working for all properties, that why i reload it instead of calling all the apis
        window.location.reload()
        setEditingOption(null)
        setEditedValue('')
      })
      .catch(() => {})
  }

  const onOptionDelete = (attributeId: any) => {
    deleteOption
      .mutateAsync({
        pathParams: {
          attributeId,
        },
      })
      .then(() => {
        window.location.reload()
        setDeleteTarget(null)
      })
      .catch(() => {})
  }
  const action = (keyword: any) => {
    setKeyword(keyword)
  }
  const debounceSearch = debounce(action, 500)

  const actionSearch = (keyword: any) => {
    setSearch(keyword)
  }
  const debounceSearchInModal = debounce(actionSearch, 500)

  const onAttributeSave = () => {
    addAttributeOptions
      .mutateAsync({
        body: {
          value: showAddModal.value,
          parentId: showAddModal.parentId,
          parentValue: showAddModal.parentValue,
        },
        pathParams: {
          attributeId,
        },
      })
      .then(() => {
        window.location.reload()
        setShowAddModal({
          open: false,
        })
      })
      .catch(() => {})
  }

  if (isFetching && !isFetchingNextPage) {
    return <></>
  }
  return (
    <div className='flex flex-col gap-4'>
      <label className='font-semibold'>
        {label} ({totalCount})
      </label>

      <Input
        placeholder={'Search' + ' ' + label}
        onChange={(e) => {
          debounceSearch(e.target.value)
        }}
      />

      <div
        ref={containerRef}
        className='min-w-[600px] overflow-y-auto rounded-md border'
        style={{ maxHeight: '500px' }}
      >
        {/* Table header */}
        <div className='sticky top-0 z-10 flex bg-black text-white'>
          <div className='flex-1 p-2 text-sm font-semibold'>{label}</div>
          <div className='w-32 p-2 text-sm font-semibold'>Actions</div>
        </div>

        {/* Table body */}
        {options?.length ? (
          options.map((item: any) => (
            <div
              key={item.value}
              className='flex items-center border-b text-sm'
            >
              {editingOption === item.value ? (
                <>
                  <div className='flex-1 p-2'>
                    <Input
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      className='w-full bg-transparent'
                    />
                  </div>
                  <div className='flex w-32 gap-1 p-2'>
                    <Button
                      size='sm'
                      onClick={async () => {
                        if (updateOptions.isPending) {
                          return
                        }
                        // await updateOption(attributeId, item.value, { value: editedValue })
                        onOptionUpdate({
                          value: editedValue,
                          attributeId: item?.uuid,
                        })
                      }}
                    >
                      {updateOptions.isPending ? (
                        <Spinner color='borer-black' />
                      ) : (
                        'Save'
                      )}
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => {
                        setEditingOption(null)
                        setEditedValue('')
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex-1 p-2'>{item?.value || '--'}</div>
                  {item?.parentValue && (
                    <div className='flex-1 p-2'>{item.parentValue}</div>
                  )}
                  <div className='flex w-32 gap-1 p-2'>
                    <Button
                      size='sm'
                      onClick={() => {
                        setEditingOption(item.value)
                        setEditedValue(item.value)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() =>
                        setDeleteTarget({
                          value: item?.value,
                          id: item?.uuid,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className='p-5 text-center text-sm text-muted-foreground'>
            No options available
          </div>
        )}
        {isFetchingNextPage && (
          <div className='p-2 text-center text-sm'>Loading more...</div>
        )}
      </div>
      <Button
        variant='outline'
        className='w-full border-dashed'
        onClick={() => {
          setShowAddModal({
            open: true,
            value: '',
            attributeId,
            dependsOn,
          })
        }}
      >
        Add {label}
      </Button>

      {/* Add Option Modal */}
      <Dialog open={showAddModal?.open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {label}</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='page-size'
              className='text-sm text-muted-foreground'
            >
              Enter {label}
            </Label>
            <Input
              placeholder={'Enter' + ' ' + label}
              value={showAddModal.value}
              onChange={(e) =>
                setShowAddModal({
                  ...showAddModal,
                  value: e.target.value,
                })
              }
            />
          </div>
          {dependsOn ? (
            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='page-size'
                className='text-sm text-muted-foreground'
              >
                Select {dependsOn}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='default'
                    role='combobox'
                    className='justify-between'
                  >
                    {showAddModal.parentId
                      ? showAddModal.parentValue
                      : `Select ${dependsOn}`}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                  <Command>
                    <CommandInput
                      onValueChange={(value) => debounceSearchInModal(value)}
                      placeholder={`Search ${dependsOn}...`}
                    />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {attributeList?.data?.map((opt: any) => (
                        <CommandItem
                          key={opt.uuid}
                          value={opt.value}
                          onSelect={() => {
                            setShowAddModal({
                              ...showAddModal,
                              parentId: opt.uuid,
                              parentValue: opt.value,
                            })
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              showAddModal.parentId === opt.uuid
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {opt.value}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <></>
          )}
          <DialogFooter className='mt-2 flex justify-end gap-2'>
            <Button onClick={onAttributeSave}>
              Add
              {addAttributeOptions.isPending ? <Spinner /> : <></>}
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                setShowAddModal({
                  open: false,
                  value: '',
                })
              }
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteTarget?.id}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className='p-2'>
            Are you sure you want to delete "{deleteTarget?.value}"?
          </div>
          <DialogFooter className='mt-2 flex justify-end gap-2'>
            <Button
              variant='destructive'
              onClick={async () => {
                // await deleteOption(attributeId, deleteTarget!)
                onOptionDelete(deleteTarget?.id)
              }}
            >
              Delete
              {deleteOption.isPending ? (
                <Spinner color='border-white' />
              ) : (
                <></>
              )}
            </Button>
            <Button variant='outline' onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
