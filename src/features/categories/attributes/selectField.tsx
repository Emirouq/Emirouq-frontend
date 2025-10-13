'use client'

import { useState, useEffect, useRef } from 'react'
import { useGetAttributeOptions } from '@/hooks/Attributes/query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export const SelectField = ({ attributeId, dependsOn, label }: any) => {
  const {
    data: attributeOptions,
    fetchNextPage: attributeFetchNextPage,
    hasNextPage: attributeHasNextPage,
    isFetchingNextPage: attributeIsFetchingNextPage,
  } = useGetAttributeOptions({
    attributeId,
    dependsOn,
  })

  const options = attributeOptions?.pages.flatMap((p: any) => p.data)

  const fetchNextPage = attributeFetchNextPage
  const hasNextPage = attributeHasNextPage
  const isFetchingNextPage = attributeIsFetchingNextPage

  const [editingOption, setEditingOption] = useState<string | null>(null)
  const [editedValue, setEditedValue] = useState<string>('')

  const [showAddModal, setShowAddModal] = useState(false)
  const [newOptionValue, setNewOptionValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

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

  return (
    <div className=''>
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
                        // await updateOption(attributeId, item.value, { value: editedValue })
                        setEditingOption(null)
                        setEditedValue('')
                      }}
                    >
                      Save
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
                      onClick={() => setDeleteTarget(item.value)}
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
        onClick={() => {}}
      >
        Add {label}
      </Button>

      {/* Add Option Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Option</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-2'>
            <Input
              placeholder='Enter option value'
              value={newOptionValue}
              onChange={(e) => setNewOptionValue(e.target.value)}
            />
          </div>
          <DialogFooter className='mt-2 flex justify-end gap-2'>
            <Button
              onClick={async () => {
                // await addOption(attributeId, newOptionValue)
                setShowAddModal(false)
                setNewOptionValue('')
              }}
            >
              Add
            </Button>
            <Button variant='outline' onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className='p-2'>
            Are you sure you want to delete "{deleteTarget}"?
          </div>
          <DialogFooter className='mt-2 flex justify-end gap-2'>
            <Button
              variant='destructive'
              onClick={async () => {
                // await deleteOption(attributeId, deleteTarget!)
                setDeleteTarget(null)
              }}
            >
              Delete
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
