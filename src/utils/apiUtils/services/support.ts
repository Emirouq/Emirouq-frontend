import { ApiEndpoint } from '@/types'
import { callApi } from '../callApi'
import support from '../endpoints/support'

export const getSupportTickets = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...support.getSupportTickets.v1 } as ApiEndpoint,
    query,
  })
}
export const respondToTicket = async ({ body, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...support.respondToTicket.v1 } as ApiEndpoint,
    body,
    pathParams,
  })
}
