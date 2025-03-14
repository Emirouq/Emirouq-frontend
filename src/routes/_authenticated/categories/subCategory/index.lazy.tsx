import { createLazyFileRoute } from '@tanstack/react-router'
import SubCategory from '@/features/categories/subCategory'

export const Route = createLazyFileRoute('/_authenticated/categories/subCategory/')({
  component: SubCategory,
})
