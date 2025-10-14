'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import { Plus, Trash } from 'lucide-react'
import {
  useCreateSubCategory,
  useUpdateSubCategory,
} from '@/hooks/Category/mutation'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// 🧩 Schema for a single property
const propertySchema = z.object({
  uuid: z.string().optional(), // for editing existing properties
  label: z.string().min(1, 'Label is required'),
  filterType: z.enum(['text', 'number', 'select', 'checkbox', 'range']),
  order: z.number().min(1),
  visibleInFilter: z.boolean().default(true),
  dependsOn: z.string().optional(),
})

// 🧱 Full form schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  deletedProperties: z.array(z.string()).optional(), // to track deleted properties during edit
  properties: z
    .array(propertySchema)
    .min(1, 'At least one property is required')
    .superRefine((properties, ctx) => {
      const orderMap = new Map<number, number[]>() // order → indexes
      properties.forEach((p, idx) => {
        if (p.order !== undefined) {
          const list = orderMap.get(p.order) || []
          orderMap.set(p.order, [...list, idx])
        }
      })

      for (const [order, indexes] of orderMap.entries()) {
        if (indexes.length > 1) {
          indexes.forEach((i) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['properties', i, 'order'], // 🟢 mark the specific field
              message: `Duplicate order value: ${order}`,
            })
          })
        }
      }
    }),
})

type FormValues = z.infer<typeof formSchema>

export default function AddSubCategory({
  open,
  setOpen,
  editDetails,
  refetch,
}: any) {
  const addSubCategory = useCreateSubCategory()
  const updateSubCategory: any = useUpdateSubCategory()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      deletedProperties: [],
      properties: [
        {
          uuid: '',
          label: '',
          filterType: 'text',
          visibleInFilter: true,
          order: 1,
          dependsOn: '',
        },
      ],
    },
  })
  useEffect(() => {
    if (editDetails?.uuid) {
      form.reset({
        ...editDetails,
      })
    }
  }, [editDetails, form])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'properties',
  })
  const { id: categoryId }: any = useParams({ strict: false })
  const onSubmit = async (values: FormValues) => {
    const payload = {
      body: {
        title: values.title,
        properties: values.properties,
        deletedProperties: values.deletedProperties || [],
      },
      pathParams: {
        categoryId,
        subCategoryId: editDetails?.uuid,
      },
    }

    if (editDetails?.uuid) {
      await updateSubCategory.mutateAsync(payload)
      toast({
        title: 'Updated successfully',
        className: 'bg-green-600 text-white',
      })
      setOpen(false)
      refetch()
      form.reset()
    } else {
      await addSubCategory.mutateAsync(payload)
      toast({
        title: 'Added successfully',
        className: 'bg-orange-500 text-white',
      })
      setOpen(false)
      refetch()
      form.reset()
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
          form.reset()
        }}
      >
        <Plus className='mr-2 h-4 w-4' /> Add Sub Category
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-h-[90vh] overflow-y-auto p-6 sm:max-w-4xl'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              {editDetails?.uuid ? 'Edit Sub Category' : 'Add Sub Category'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Title */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter Sub Category Title'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Properties */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Properties
                </h3>

                {fields?.map((field, index) => (
                  <Card key={field.id} className='relative space-y-4 p-5'>
                    <div className='flex items-center justify-between border-b pb-2'>
                      <h4 className='font-medium text-gray-700'>
                        Property {index + 1}
                      </h4>
                      <Button
                        type='button'
                        size='icon'
                        variant='ghost'
                        onClick={() => {
                          const checkIsDependsOn = form
                            .watch('properties')
                            ?.find((i) => field.label === i.dependsOn)
                          if (checkIsDependsOn || field.dependsOn) {
                            return toast({
                              title:
                                'Cannot delete it, because it depends on something',
                              className: 'bg-red-600 text-white',
                            })
                          }
                          remove(index)
                          form.setValue('deletedProperties', [
                            ...(form.getValues().deletedProperties || []),
                            ...(field.uuid ? [field.uuid] : []),
                          ])
                        }}
                      >
                        <Trash className='h-4 w-4 text-red-500' />
                      </Button>
                    </div>

                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-4'>
                      <FormField
                        control={form.control}
                        name={`properties.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='e.g. Engine Type'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`properties.${index}.filterType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Filter Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select Type' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='text'>Text</SelectItem>
                                <SelectItem value='number'>Number</SelectItem>
                                <SelectItem value='select'>Select</SelectItem>
                                <SelectItem value='checkbox'>
                                  Checkbox
                                </SelectItem>
                                {/* <SelectItem value='range'>Range</SelectItem> */}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`properties.${index}.order`}
                        render={({ field }) => (
                          <FormItem className=''>
                            <FormLabel>Order</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='1'
                                value={field.value ?? ''}
                                onChange={(e) => {
                                  const val = e.target.value
                                  if (parseInt(val) < 1) return
                                  field.onChange(
                                    val === '' ? undefined : parseInt(val)
                                  )
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {form?.watch('properties')?.length ? (
                        <FormField
                          control={form.control}
                          name={`properties.${index}.dependsOn`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Depends On</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  if (value === 'clear') {
                                    field.onChange('') // clear form value
                                    return
                                  }
                                  field.onChange(value)
                                }}
                                value={field.value || ''} // ✅ make it controlled
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Select the relation' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem
                                    value='clear'
                                    className='text-red-500'
                                  >
                                    Clear
                                  </SelectItem>
                                  {(form.watch('properties') || [])?.map(
                                    (i) => (
                                      <SelectItem
                                        value={i?.label}
                                        key={i?.label}
                                      >
                                        {i?.label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <></>
                      )}
                      <FormField
                        control={form.control}
                        name={`properties.${index}.visibleInFilter`}
                        render={({ field }) => (
                          <FormItem className='flex items-center gap-2'>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FormLabel>Visible in Filters</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}

                <Button
                  type='button'
                  variant='secondary'
                  className='mt-4 w-full'
                  onClick={() =>
                    append({
                      uuid: '',
                      label: '',
                      filterType: 'text',
                      visibleInFilter: true,
                      // auto-increment
                      order: fields.length + 1,
                      dependsOn: '',
                    })
                  }
                >
                  <Plus className='mr-2 h-4 w-4' /> Add Property
                </Button>
              </div>

              <DialogFooter className='pt-6'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={
                    addSubCategory.isPending || updateSubCategory.isPending
                  }
                >
                  {addSubCategory.isPending || updateSubCategory.isPending
                    ? 'Saving...'
                    : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
