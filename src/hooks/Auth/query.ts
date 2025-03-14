import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/utils/apiUtils/services/user'

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
  })
