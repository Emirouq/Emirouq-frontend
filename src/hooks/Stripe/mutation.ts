
import { useMutation } from '@tanstack/react-query'
import { createPlan } from '@/utils/apiUtils/services/stripe'

export const useCreatePlan = () => {
  return useMutation({
    mutationFn: (payload: any) => createPlan(payload),
  })
}
