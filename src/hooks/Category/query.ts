import { useQuery } from '@tanstack/react-query'
import { getCategoriesService, getSubCategories } from '@/utils/apiUtils/services/category'

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesService,
  })
}
export const useGetSubCategories = (payload:any) => {
  return useQuery({
    queryKey: ['subCategories'],
    queryFn:()=> getSubCategories(payload),
  })
}
