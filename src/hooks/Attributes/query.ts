import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  getAttributeOptions,
  getAttributes,
  getParentAttributeOptions,
} from '@/utils/apiUtils/services/attribute'

export const useGetAttributes = ({ subCategoryId, keyword }: any) =>
  useQuery({
    queryKey: ['attributes', subCategoryId, keyword],
    queryFn: ({ pageParam }) =>
      getAttributes({
        query: { start: pageParam, keyword },
        pathParams: { subCategoryId },
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!subCategoryId,
  })

// this is used when, i manually enter the model name, then i have to select brand this is called there
export const useGetAttributeOptionsForParent = ({
  parentId,
  keyword = '',
}: any) =>
  useQuery({
    queryKey: ['get-attribute-parent-options', parentId, keyword],
    queryFn: () =>
      getAttributeOptions({
        query: {
          ...(keyword && { keyword }),
        },
        pathParams: { attributeId: parentId },
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!parentId,
  })

export const useGetAttributeOptions = ({ attributeId, keyword = '' }: any) =>
  useInfiniteQuery({
    queryKey: ['attributes-options', attributeId, keyword],
    queryFn: ({ pageParam }) =>
      getAttributeOptions({
        query: {
          start: pageParam,
          ...(keyword && { keyword }),
        },
        pathParams: { attributeId },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * 10
      if (currentStart < lastPage?.count) {
        return currentStart
      } else {
        return undefined
      }
    },
    initialPageParam: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!attributeId,
  })

// means parent Id is Bmw, here we will get bmw cars
export const useGetParentAttributeOptions = ({ parentId }: any) =>
  useInfiniteQuery({
    queryKey: ['parent-attribute-options', parentId],
    queryFn: ({ pageParam }) =>
      getParentAttributeOptions({
        query: { start: pageParam },
        pathParams: { parentId },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * 10
      if (currentStart < lastPage?.count) {
        return currentStart
      } else {
        return undefined
      }
    },
    initialPageParam: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!parentId,
  })
