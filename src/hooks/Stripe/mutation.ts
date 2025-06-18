
import { useMutation } from '@tanstack/react-query'
import { createPlan, updatePlan } from '@/utils/apiUtils/services/stripe'

export const useCreatePlan = () => {
  return useMutation({
    mutationFn: (payload: any) => createPlan(payload),
  })
}

export const useUpdatePlan = () => {
  return useMutation({
    mutationFn: (payload: any) => updatePlan(payload),
  })
}


