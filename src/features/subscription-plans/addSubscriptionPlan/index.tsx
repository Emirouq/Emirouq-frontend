import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearch } from '@tanstack/react-router'
import { useCreatePlan, useUpdatePlan } from '@/hooks/Stripe/mutation'
import { useGetSubscriptionPlans } from '@/hooks/Stripe/query'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

const numericField = z
  .union([z.string(), z.number()])
  .transform((val) => String(val))
  .refine((val) => val.length > 0, { message: 'This field is required' })

const optionalNumericField = z
  .union([z.string(), z.number()])
  .transform((val) => String(val))

export const PlanSchema = z.object({
  uuid: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  amount: numericField,
  // currency: z.string().min(1, 'Currency is required'),
  interval: z.enum(['day', 'week', 'month', 'year']),
  interval_count: numericField,
  numberOfAds: optionalNumericField,
  featuredAdBoosts: optionalNumericField,
  additionalBenefits: z.any(),
  categories: z.array(z.string()).optional(),
  isVerifiedBadge: z.boolean(),
  prioritySupport: z.boolean(),
  premiumSupport: z.boolean(),
})

export const FormSchema = z.object({
  plans: z.array(PlanSchema),
})

export type FormType = z.infer<typeof FormSchema>

export const defaultPlan: any = {
  uuid: '',
  name: '',
  amount: '',
  // currency: '',
  interval: 'month',
  interval_count: '',
  numberOfAds: '',
  featuredAdBoosts: '',
  additionalBenefits: '',
  categories: [],
  isVerifiedBadge: false,
  prioritySupport: false,
  premiumSupport: false,
}

const AddSubscriptionPlan = () => {
  const search: any = useSearch({ strict: false })

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { plans: [defaultPlan] },
  })

  const { data: subscriptionPlans, refetch: singleSubscription }: any =
    useGetSubscriptionPlans({
      query: { categoryId: search?.subId },
    })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'plans',
  })

  const { mutate: createPlan } = useCreatePlan()
  const { mutate: updatePlan } = useUpdatePlan()
  const [submittingIndex, setSubmittingIndex] = useState<number | null>(null)

  useEffect(() => {
    if (subscriptionPlans?.data) {
      const existingPlan = subscriptionPlans.data
      form.reset({
        plans: existingPlan,
      })
    }
  }, [subscriptionPlans])

  const onSubmitPlan = async (data: FormType, index: number) => {
    setSubmittingIndex(index)
    const planData = data.plans[index]
    const isEdit = Boolean(planData.uuid)

    const payload = data?.plans
      ?.filter((plan) => !(!isEdit && plan?.uuid))
      ?.map((plan) => ({
        ...plan,
        uuid: plan?.uuid || undefined,
      }))

    if (isEdit) {
      updatePlan(
        {
          pathParams: { id: planData.uuid },
          body: { categoryId: search.subId, payload },
        },
        {
          onSuccess: () => {
            toast({
              title: 'Success',
              description: 'Plan updated!',
              className: 'bg-green-500 text-white',
            })
            singleSubscription()
          },
          onError: () => {
            toast({
              title: 'Error',
              description: 'Failed to update plan',
              variant: 'destructive',
            })
          },
          onSettled: () => setSubmittingIndex(null),
        }
      )
    } else {
      createPlan(
        { body: { categoryId: search.subId, payload } },
        {
          onSuccess: () => {
            toast({
              title: 'Success',
              description: 'Plan created!',
              className: 'bg-orange-500 text-white',
            })
            singleSubscription()
          },
          onError: () => {
            toast({
              title: 'Error',
              description: 'Failed to create plan',
              variant: 'destructive',
            })
          },
          onSettled: () => setSubmittingIndex(null),
        }
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Header fixed>
          {/* <Search /> */}
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='mb-4'>
            <h2 className='text-2xl font-bold tracking-tight'>
              {search?.title} Category Subscription
            </h2>
            <p className='text-muted-foreground'>
              Manage your Category and their Subscription here.
            </p>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className='mb-6 rounded-md border p-4 shadow'>
              <div className='mb-2 flex items-center justify-between'>
                <h4 className='text-lg font-semibold'>
                  {form.getValues(`plans.${index}.uuid`)
                    ? 'Edit Plan'
                    : 'New Plan'}{' '}
                  {index + 1}
                </h4>
                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => remove(index)}
                    className='text-sm'
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  name={`plans.${index}.name`}
                  control={form.control}
                  render={({ field }) => {
                    const selectedPlanNames = form
                      .watch('plans')
                      .map((p) => p.name)
                    return (
                      <FormItem>
                        <FormLabel>Select Plan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                            ].map((p) => (
                              <SelectItem
                                key={p}
                                value={p}
                                disabled={
                                  selectedPlanNames.includes(p) &&
                                  field.value !== p
                                }
                              >
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  name={`plans.${index}.amount`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 
                <FormField
                  name={`plans.${index}.currency`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='e.g. USD' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  name={`plans.${index}.interval`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interval</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className='w-full rounded-md border p-2'
                        >
                          {['day', 'week', 'month', 'year'].map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`plans.${index}.interval_count`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interval Count</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`plans.${index}.numberOfAds`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Ads</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`plans.${index}.featuredAdBoosts`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Ad Boosts</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name={`plans.${index}.additionalBenefits`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className='mt-4'>
                    <FormLabel>Additional Benefits</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className='w-full rounded-md border p-2'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mt-4 flex gap-4'>
                {(
                  [
                    'isVerifiedBadge',
                    'prioritySupport',
                    'premiumSupport',
                  ] as const
                ).map((fieldName) => (
                  <FormField
                    key={fieldName}
                    name={`plans.${index}.${fieldName}`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='flex items-center space-x-2'>
                        <FormControl>
                          <input
                            className='mt-2'
                            type='checkbox'
                            ref={field.ref}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            checked={field.value}
                            name={field.name}
                          />
                        </FormControl>
                        <FormLabel className='capitalize'>
                          {fieldName.replace(/([A-Z])/g, ' $1')}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className='mt-4'>
                {form.getValues(`plans.${index}.uuid`) ? (
                  <></>
                ) : (
                  <Button
                    type='button'
                    onClick={form.handleSubmit((data) =>
                      onSubmitPlan(data, index)
                    )}
                    className='w-full'
                  >
                    {submittingIndex === index
                      ? 'Saving...'
                      : form.getValues(`plans.${index}.uuid`)
                        ? 'Update Plan'
                        : 'Save Plan'}
                  </Button>
                )}
              </div>
            </div>
          ))}

          <DialogFooter className='mt-4'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => append(defaultPlan)}
            >
              + Add Another Plan
            </Button>
          </DialogFooter>
        </Main>
      </form>
    </Form>
  )
}

export default AddSubscriptionPlan
