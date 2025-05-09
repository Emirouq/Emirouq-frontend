import { useState } from 'react'
import { useCreateCategory, useUpdateCategory } from '@/hooks/Category/mutation'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import CustomUpload from '@/components/custom/CustomUpload'

const AddCategory = ({
  open,
  setOpen,
  editId,
  refetch,
  title,
  setTitle,
  logo,
  setLogo,
}: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutate } = useCreateCategory()
  const updateCategory = useUpdateCategory()

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Category name is required.',
        variant: 'destructive',
      })
      return
    }
    console.log('logo', logo)
    if (!logo.file && !logo.url) {
      toast({
        title: 'Validation Error',
        description: 'Please upload a category logo.',
        variant: 'destructive',
      })
      return
    }
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('logo', logo?.file)
    if (editId) {
      updateCategory
        ?.mutateAsync({ body: formData, pathParams: { id: editId } })
        ?.then(() => {
          toast({
            title: 'Success',
            description: 'Category updated successfully!',
            className: 'bg-orange-500 text-white',
          })
          setOpen(false)
          setTitle('')
          setLogo({ url: '', file: '' })
          refetch()
        })
        ?.catch(() => {
          toast({
            title: 'Error',
            description: 'Failed to update category',
            variant: 'destructive',
            className: 'bg-red-500 text-white',
          })
        })
        ?.finally(() => {
          setIsSubmitting(false)
        })
    } else {
      mutate(
        { body: formData },
        {
          onSuccess: () => {
            toast({
              title: 'Success',
              description: 'Category added successfully!',
              className: 'bg-orange-500 text-white',
            })
            setOpen(false)
            setTitle('')
            setLogo({ url: '', file: '' })
            refetch()
          },
          onError: () => {
            toast({
              title: 'Error',
              description: 'Failed to add category',
              variant: 'destructive',
              className: 'bg-red-500 text-white',
            })
          },
          onSettled: () => {
            setIsSubmitting(false)
          },
        }
      )
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${editId ? 'Edit' : 'Add'} Category`}</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <label className='block text-sm font-medium'>Category Name</label>
            <Input
              placeholder='Enter category name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className='flex-col items-center'>
              <CustomUpload label='Upload Logo' file={logo} setFile={setLogo} />
            </div>
          </div>
          <DialogFooter>
            <Button
              className='w-full'
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className='flex items-center'>
                  <svg
                    className='mr-2 h-4 w-4 animate-spin text-white'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z'
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddCategory
