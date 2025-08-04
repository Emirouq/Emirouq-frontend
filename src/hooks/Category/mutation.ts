import { useMutation } from '@tanstack/react-query'
import {
  addSubCategory,
  createCategoryService,
  updateCategoryService,
  updateSubCategoryService,
} from '@/utils/apiUtils/services/category'

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (payload: any) => createCategoryService(payload),
  })
}
export const useCreateSubCategory = () => {
  return useMutation({
    mutationFn: (payload: any) => addSubCategory(payload),
  })
}
export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: (payload: any) => updateCategoryService(payload),
  })
}
export const useUpdateSubCategory = () => {
  return useMutation({
    mutationFn: (payload: any) => updateSubCategoryService(payload),
  })
}
