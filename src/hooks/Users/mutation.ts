import { useMutation } from '@tanstack/react-query'
import {
  createUserService,
  updateProfileService,
} from '@/utils/apiUtils/services/user'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (payload: any) => createUserService(payload),
  })
}
export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (payload: any) => updateProfileService(payload),
  })
}
