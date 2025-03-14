import { ApiEndpoint } from 'src/types'
import { callApi } from '../callApi'
import category from '../endpoints/category'

export const createCategoryService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...category.createCategory.v1 } as ApiEndpoint,
    body,
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const getCategoriesService = async () => {
  return callApi({
    uriEndPoint: { ...category.getCategories.v1 } as ApiEndpoint,
  })
}
export const getSubCategories = async ({pathParams}:any) => {
  return callApi({
    uriEndPoint: { ...category.getSubCategory.v1 } as ApiEndpoint,
    pathParams
  })
}
export const updateCategoryService = async ({ body, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...category.updateCategory.v1 } as ApiEndpoint,
    body,
    pathParams,
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const addSubCategory = async ({ body, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...category.addSubCategory.v1 } as ApiEndpoint,
    body,
    pathParams,
  })
}
export const updateSubCategory = async ({ body, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...category.updateSubCategory.v1 } as ApiEndpoint,
    body,
    pathParams,
  })
}
