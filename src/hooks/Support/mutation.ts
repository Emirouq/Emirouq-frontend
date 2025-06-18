import { useMutation } from '@tanstack/react-query'
import { respondToTicket } from '@/utils/apiUtils/services/support'

export const useRespondTicket = () => {
  return useMutation({
    mutationFn: (payload: any) => respondToTicket(payload),
  })
}
