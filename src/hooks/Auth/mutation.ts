import { useMutation } from '@tanstack/react-query'
import { login } from '@/utils/apiUtils/services/auth'

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (payload: any) => login(payload),
  })
}
