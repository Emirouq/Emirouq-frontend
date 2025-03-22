import { ApiEndpoint } from "@/types"
import { callApi } from "../callApi"
import post from "../endpoints/post"



export const getPostsService = async () => {
    return callApi({
      uriEndPoint: { ...post.getPosts.v1 } as ApiEndpoint,
    })
  }