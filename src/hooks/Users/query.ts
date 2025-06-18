import { useQuery } from '@tanstack/react-query'
import { getUsersList } from '@/utils/apiUtils/services/users'

export const useGetUsers = (payload:any) =>
  useQuery({
    queryKey: ['usersList'],
    queryFn: ()=>getUsersList(payload),
    refetchOnWindowFocus: false,
  })
