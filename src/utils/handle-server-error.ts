import { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'

export function handleServerError(error: any) {
  // eslint-disable-next-line no-console

  let errMsg = error?.message || 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    errMsg = error.response?.data.title
  }

  toast({ variant: 'destructive', title: errMsg })
}
