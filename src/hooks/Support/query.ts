import { useQuery } from '@tanstack/react-query'
import { getSupportTickets } from '@/utils/apiUtils/services/support'

export const useGetSupport = (payload: any) => {
  return useQuery({
    queryKey: ['posts', payload],
    queryFn: () => getSupportTickets(payload),
  })
}
