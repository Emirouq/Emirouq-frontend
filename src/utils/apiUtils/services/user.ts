import { ApiEndpoint } from 'src/types'
import { callApi } from '../callApi'
import user from '../endpoints/user'

// Assuming you have a types file

// Assuming callApi and user.fetchMe.v1 are already correctly typed,
// this conversion should be straightforward.

export const getCurrentUser = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.fetchMe.v1 } as ApiEndpoint,
  })
}

export const createUserService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.createUser.v1 } as ApiEndpoint,
    body,
  })
}

export const updateProfileService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.updateProfile.v1 } as ApiEndpoint,
    body,
    additionalHeaders: {
      'Content-Type': 'application/json',
    },
  })
}
export const resetPasswordService = async ({ pathParams }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.resetPassword.v1 } as ApiEndpoint,
    pathParams,
  })
}
