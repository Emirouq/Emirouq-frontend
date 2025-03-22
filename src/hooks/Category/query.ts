import { useQuery } from '@tanstack/react-query'
import { getCategoriesService, getSubCategories } from '@/utils/apiUtils/services/category'

export const useGetCategories = (payload:any) => {
  return useQuery({
    queryKey: ['categories'],
    queryFn:()=> getCategoriesService(payload),
  })
}
export const useGetSubCategories = (payload:any) => {
  return useQuery({
    queryKey: ['subCategories'],
    queryFn:()=> getSubCategories(payload),
  })
}
