import { useMutation } from '@tanstack/react-query'
import {
  addAttributeOptions,
  deleteAttributeOptions,
  updateAttributeOptions,
} from '@/utils/apiUtils/services/attribute'

export const useUpdateAttributeOptions = () => {
  return useMutation({
    mutationFn: (payload: any) => updateAttributeOptions(payload),
  })
}
export const useDeleteAttributeOptions = () => {
  return useMutation({
    mutationFn: (payload: any) => deleteAttributeOptions(payload),
  })
}
export const useAddAttributeOptions = () => {
  return useMutation({
    mutationFn: (payload: any) => addAttributeOptions(payload),
  })
}
