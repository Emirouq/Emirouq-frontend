import { createLazyFileRoute } from '@tanstack/react-router'
import SubscriptionPlans from '@/features/subscription-plans'

export const Route = createLazyFileRoute('/_authenticated/subscription-plans/')(
  {
    component: SubscriptionPlans,
  }
)
