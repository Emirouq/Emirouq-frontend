import { ApiEndpoint } from "@/types"
import { callApi } from "../callApi"
import post from "../endpoints/post"



export const getPostsService = async ({query}:any) => {
    return callApi({
      uriEndPoint: { ...post.getPosts.v1 } as ApiEndpoint,
      query
    })
  }

export const updateStatusService = async ({pathParams, body}:any) => {
    return callApi({
      uriEndPoint: { ...post.updateStatus.v1 } as ApiEndpoint,
      pathParams, body
    })
  }