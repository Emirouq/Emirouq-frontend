import { ApiEndpoint } from 'src/types'
import { callApi } from '../callApi'
import users from '../endpoints/users'


export const getUsersList = async ({query}:any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...users.usersList.v1 } as ApiEndpoint,
    query
  })
}

