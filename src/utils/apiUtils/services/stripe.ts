
import { ApiEndpoint } from 'src/types'
import { callApi } from '../callApi'
import stripe from '../endpoints/stripe'


export const createPlan = async ({body}:any) => {
  return callApi({
    uriEndPoint: { ...stripe.createPlan.v1 } as ApiEndpoint,
    body
  })
}

export const updatePlan = async ({body, pathParams}:any) => {
  return callApi({
    uriEndPoint: { ...stripe.update.v1 } as ApiEndpoint,
    body,
    pathParams
  })
}




export const getPlans = async ({query}:any) => {
  return callApi({
    uriEndPoint: { ...stripe.getPlans.v1 } as ApiEndpoint,
    query
  })
}

