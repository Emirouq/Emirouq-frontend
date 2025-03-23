import { useQuery } from '@tanstack/react-query'
import { getPostsService } from '@/utils/apiUtils/services/post'

export const useGetPosts = (payload:any) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: ()=>getPostsService(payload),
  })
}
// export const useGetSubCategories = (payload:any) => {
//   return useQuery({
//     queryKey: ['subCategories'],
//     queryFn:()=> getSubCategories(payload),
//   })
// }
