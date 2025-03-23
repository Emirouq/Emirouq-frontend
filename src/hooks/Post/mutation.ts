

import { useMutation } from '@tanstack/react-query'
import { updateStatusService } from '@/utils/apiUtils/services/post'

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: (payload: any) => updateStatusService(payload),
  })
}
