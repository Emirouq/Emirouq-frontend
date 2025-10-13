import { createFileRoute } from '@tanstack/react-router'
import Attributes from '@/features/categories/attributes'

export const Route = createFileRoute(
  '/_authenticated/categories/$id/attributes'
)({
  component: Attributes,
})
