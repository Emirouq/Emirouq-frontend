import { createFileRoute } from '@tanstack/react-router'
import AddSubscriptionPlan from '@/features/subscription-plans/addSubscriptionPlan'

export const Route = createFileRoute('/_authenticated/categories/subscription')(
  {
    component: AddSubscriptionPlan,
  }
)
