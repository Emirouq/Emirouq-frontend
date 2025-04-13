import { useState } from 'react'
import { useGetCategories } from '@/hooks/Category/query'
import { useCreatePlan } from '@/hooks/Stripe/mutation'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import MultiSelect from '@/components/custom/MultiSelect'

const AddSubscriptionPlan = ({ open, setOpen, editId, form, refetch }: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: categories }: any = useGetCategories({ query: {} })

  const { mutate } = useCreatePlan()

  const onSubmit = (data: any) => {
    setIsSubmitting(true)
    const body = {
      ...data,
    }
    // if (editId) {
    //   updateCategory
    //     ?.mutateAsync({ body: formData, pathParams: { id: editId } })
    //     ?.then(() => {
    //       toast({
    //         title: 'Success',
    //         description: 'Category updted successfully!',
    //         className: 'bg-orange-500 text-white',
    //       })
    //       setOpen(false)
    //       setTitle('')
    //       setLogo({ url: '', file: '' })
    //       refetch()
    //     })
    //     ?.catch(() => {
    //       toast({
    //         title: 'Error',
    //         description: 'Failed to update category',
    //         variant: 'destructive',
    //         className: 'bg-red-500 text-white',
    //       })
    //     })
    //     ?.finally(() => {
    //       setIsSubmitting(false)
    //     })
    // } else {
    mutate(
      { body },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Plan added successfully!',
            className: 'bg-orange-500 text-white',
          })
          setOpen(false)
          refetch()
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to add plan',
            variant: 'destructive',
            className: 'bg-red-500 text-white',
          })
        },
        onSettled: () => {
          setIsSubmitting(false)
        },
      }
    )
    // }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${editId ? 'Edit' : 'Add'} Subscription Plan`}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-4'>
                {/* Name */}

                <FormField
                  name='name'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>
                        Select Plan
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a plan' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            'Basic',
                            'Starter',
                            'Pro',
                            'Elite',
                            'Business',
                          ]?.map((ite: any) => {
                            return <SelectItem value={ite}>{ite}</SelectItem>
                          })}
                        </SelectContent>
                      </Select>
                      {/* <FormControl>
                        <Select
                          options={planOptions}
                          value={planOptions.find(
                            (opt) => opt.value === field.value
                          )}
                          onChange={(selected) =>
                            field.onChange(selected?.value)
                          }
                          placeholder='Select a plan'
                        />
                      </FormControl> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Amount */}
                <FormField
                  name='amount'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder='Enter amount'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Currency */}
                <FormField
                  name='currency'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>Currency</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='e.g. USD, AUD' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Interval */}
                <FormField
                  name='interval'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>Interval</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className='w-full rounded-md border p-2 text-sm text-gray-700'
                        >
                          <option value='day'>Day</option>
                          <option value='week'>Week</option>
                          <option value='month'>Month</option>
                          <option value='year'>Year</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Interval Count */}
                <FormField
                  name='interval_count'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>
                        Interval Count
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder='e.g. 1 for every month'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Number of Ads */}
                <FormField
                  name='numberOfAds'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>
                        Number of Ads
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder='Enter ad count'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Featured Ad Boosts */}
                <FormField
                  name='featuredAdBoosts'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-800'>
                        Featured Ad Boosts
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder='Enter boost count'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Additional Benefits */}
              <FormField
                name='additionalBenefits'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-800'>
                      Additional Benefits
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className='w-full rounded-md border p-2 text-sm text-gray-700'
                        placeholder='Write additional perks or benefits...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='mb-4 grid grid-cols-2 gap-3'>
                {/* Is Verified Badge */}
                <FormField
                  name='isVerifiedBadge'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <input
                          type='checkbox'
                          {...field}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormLabel className='mb-0 text-gray-800'>
                        Verified Badge
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Priority Support */}
                <FormField
                  name='prioritySupport'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <input
                          type='checkbox'
                          {...field}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormLabel className='mb-0 text-gray-800'>
                        Priority Support
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Premium Support */}
                <FormField
                  name='premiumSupport'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <input
                          type='checkbox'
                          {...field}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormLabel className='mb-0 text-gray-800'>
                        Premium Support
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name='categories'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='mb-4'>
                    <FormLabel className='text-gray-800'>Categories</FormLabel>
                    <FormControl>
                      <MultiSelect
                        field={field}
                        data={
                          categories?.data?.map((ite: any) => {
                            return {
                              label: ite?.title,
                              value: ite?.uuid,
                            }
                          }) || []
                        }
                        value={
                          categories?.data
                            ?.filter((option: any) =>
                              field.value?.includes(option.uuid)
                            )
                            .map((option: any) => ({
                              label: option.title,
                              value: option.uuid,
                            })) || []
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

export default AddSubscriptionPlan
