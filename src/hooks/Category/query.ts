import { useQuery } from '@tanstack/react-query'
import {
  getCategoriesService,
  getSubCategories,
} from '@/utils/apiUtils/services/category'

export const useGetCategories = ({ keyword, page, limit }: any) => {
  return useQuery({
    queryKey: ['categories', keyword, page, limit],
    queryFn: () =>
      getCategoriesService({
        query: {
          keyword,
          page,
          limit,
        },
      }),
  })
}
export const useGetSubCategories = ({
  categoryId,
  keyword,
}: {
  categoryId: string
  keyword: string
}) => {
  return useQuery({
    queryKey: ['subCategories', categoryId, keyword],
    queryFn: () =>
      getSubCategories({
        pathParams: { categoryId },
        query: { keyword },
      }),
    enabled: !!categoryId,
  })
}
