import { useState } from 'react'
import { useLocation, useParams } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import {
  useCreateSubCategory,
  useUpdateCategory,
} from '@/hooks/Category/mutation'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const AddSubCategory = ({
  open,
  setOpen,
  editId,
  properties,
  setProperties,
  refetch,
  form,
}: any) => {
  const { mutate } = useCreateSubCategory()
  const updateSubCategory: any = useUpdateCategory()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { id }: any = useParams({ strict: false })

  const onSubmit = (values: any) => {
    setIsSubmitting(true)
    if (editId) {
      updateSubCategory
        ?.mutateAsync({
          body: {
            title: values?.title,
            properties,
          },
          pathParams: {
            id: editId,
          },
        })
        ?.then(() => {
          toast({
            title: 'Success',
            description: 'Sub category updated successfully!',
            className: 'bg-green-600 text-white',
          })
          setOpen(false)
          setProperties([''])
          refetch()
        })
        ?.catch(() => {
          toast({
            title: 'Error',
            description: 'Failed to update sub-category',
            variant: 'destructive',
            className: 'bg-red-500 text-white',
          })
        })
        ?.finally(() => {
          setIsSubmitting(false)
        })
    } else {
      mutate(
        {
          body: {
            title: values?.title,
            properties,
          },
          pathParams: {
            id,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: 'Success',
              description: 'Sub category added successfully!',
              className: 'bg-orange-500 text-white',
            })
            setOpen(false)
            setProperties([''])
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
  const handlePropertyChange = (index: any, value: any) => {
    const updatedProperties = [...properties]
    updatedProperties[index] = value
    setProperties(updatedProperties)
  }

  const addPropertyField = () => {
    setProperties([...properties, ''])
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${editId ? 'Edit' : 'Add'} Sub Category`}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <div className=''>
                <FormField
                  name='title'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>
                        Enter Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          {...field}
                          placeholder='Enter title'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <label className='my-2 block text-sm font-medium'>
                  Properties
                </label>
                <div className='space-y-2'>
                  {properties.map((property: any, index: any) => (
                    <div key={index} className='flex items-center space-x-2'>
                      <Input
                        placeholder={`Property ${index + 1}`}
                        value={property}
                        onChange={(e) =>
                          handlePropertyChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  variant='outline'
                  className='mt-2 flex items-center'
                  type='button'
                  onClick={addPropertyField}
                >
                  <Plus className='mr-1 h-4 w-4' /> Add Property
                </Button>
              </div>
              <DialogFooter>
                <Button
                  className='w-full'
                  disabled={isSubmitting}
                  type='submit'
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddSubCategory
