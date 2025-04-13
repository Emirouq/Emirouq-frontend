
import { ApiEndpoint } from 'src/types'
import { callApi } from '../callApi'
import stripe from '../endpoints/stripe'


export const createPlan = async ({body}:any) => {
  return callApi({
    uriEndPoint: { ...stripe.createPlan.v1 } as ApiEndpoint,
    body
  })
}

