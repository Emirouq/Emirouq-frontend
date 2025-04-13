import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import AddSubscriptionPlan from './addSubscriptionPlan'
import { columns } from './components/plans-columns'
import { PlansTable } from './components/plans-table'

const SubscriptionPlans = () => {
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState()
  //  const { data, refetch }: any = useGetSubscriptionPlans({ query: { keyword } })

  const formSchema = z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Plan name is required'),

    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .nonnegative('Amount must be 0 or more'),

    currency: z
      .string({
        required_error: 'Currency is required',
      })
      .min(1, 'Currency is required'),

    interval: z.enum(['day', 'week', 'month', 'year'], {
      required_error: 'Interval is required',
    }),

    interval_count: z
      .number({
        required_error: 'Interval count is required',
        invalid_type_error: 'Interval count must be a number',
      })
      .int('Interval count must be an integer')
      .min(1, 'Must be at least 1'),

    numberOfAds: z
      .number({
        required_error: 'Number of ads is required',
        invalid_type_error: 'Number of ads must be a number',
      })
      .int('Must be an integer')
      .nonnegative(),

    featuredAdBoosts: z
      .number({
        required_error: 'Featured ad boosts is required',
        invalid_type_error: 'Featured ad boosts must be a number',
      })
      .int()
      .nonnegative(),

    isVerifiedBadge: z.boolean().default(false),
    prioritySupport: z.boolean().default(false),
    premiumSupport: z.boolean().default(false),

    additionalBenefits: z.string().optional().nullable(),
    categories: z.array(z.string()).min(1, 'Select at least one category'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isVerifiedBadge: false,
      prioritySupport: false,
      premiumSupport: false,
      categories: [],
    },
  })

  return (
    <div>
      {' '}
      <Header fixed>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Subscription Plans
            </h2>
            <p className='text-muted-foreground'>
              Manage your subscription plans here.
            </p>
          </div>
          <div className='flex gap-x-2'>
            <Input
              placeholder='Search categories...'
              // onChange={(e) => {
              // debounceSearch(e.target.value)
              // }}
              className=''
            />
            <AddSubscriptionPlan
              open={open}
              setOpen={setOpen}
              setEditId={setEditId}
              editId={editId}
              form={form}
              // refetch={refetch}
            />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <PlansTable data={[]} columns={columns()} />
        </div>
      </Main>
      {/* <UsersDialogs /> */}
    </div>
  )
}

export default SubscriptionPlans
