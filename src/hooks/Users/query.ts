import { useQuery } from '@tanstack/react-query'
import { getUsersList } from '@/utils/apiUtils/services/users'

export const useGetUsers = () =>
  useQuery({
    queryKey: ['usersList'],
    queryFn: getUsersList,
    refetchOnWindowFocus: false,
  })
