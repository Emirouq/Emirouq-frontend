import { getPlans } from "@/utils/apiUtils/services/stripe"
import { useQuery } from "@tanstack/react-query"

export const useGetSubscriptionPlans = (payload:any) => {
    return useQuery({
      queryKey: ['subscription-plans'],
      queryFn:()=> getPlans(payload),
    })
  }