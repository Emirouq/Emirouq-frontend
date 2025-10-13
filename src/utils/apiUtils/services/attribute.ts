// Import necessary types and utilities
import { ApiEndpoint } from '@/types'
import { callApi } from '../callApi'
import attributes from '../endpoints/attribute'

export const getAttributes = async ({ pathParams, query }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.getAttributes.v1 } as ApiEndpoint,
    pathParams,
    query,
  })
}
export const getAttributeOptions = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.getAttributeOptions.v1 } as ApiEndpoint,
    query,
    pathParams,
  })
}
export const getParentAttributeOptions = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.getParentAttributeOptions.v1 } as ApiEndpoint,
    query,
    pathParams,
  })
}
export const updateAttributeOptions = async ({ pathParams, body }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.updateAttributeOptions.v1 } as ApiEndpoint,
    pathParams,
    body,
  })
}
export const deleteAttributeOptions = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.deleteAttributeOptions.v1 } as ApiEndpoint,
    pathParams,
  })
}
export const addAttributeOptions = async ({ pathParams, body }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.addAttributeOptions.v1 } as ApiEndpoint,
    pathParams,
    body,
  })
}
