import { ApiEndpoint } from '@/types'
import { callApi } from '../callApi'
import support from '../endpoints/support'

export const getSupportTickets = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...support.getSupportTickets.v1 } as ApiEndpoint,
    query,
  })
}
