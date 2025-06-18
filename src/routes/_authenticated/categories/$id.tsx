import { createFileRoute } from '@tanstack/react-router'
import SubCategory from '@/features/categories/subCategory'

export const Route = createFileRoute('/_authenticated/categories/$id')({
  component: SubCategory,
})
