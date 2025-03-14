// Importing necessary utilities
import { ApiEndpoint } from 'src/types'
import { callApi } from '../callApi'
import auth from '../endpoints/auth'

export interface LoginParams {
  email: string | undefined
  password: string | undefined
}

// Example login function with typed parameters
export async function login({ body }: any) {
  return callApi({
    uriEndPoint: { ...auth.login.v1 } as ApiEndpoint,
    body,
  })
}

export async function forgotPasswordService({ body }: never) {
  return callApi({
    uriEndPoint: { ...auth.forgotPassword.v1 } as ApiEndpoint,
    body,
  })
}
export async function verifyOtp({ pathParams }: never) {
  return callApi({
    uriEndPoint: { ...auth.verifyOtp.v1 } as ApiEndpoint,
    pathParams,
  })
}

export async function resetPassword({ pathParams }: never) {
  return callApi({
    uriEndPoint: { ...auth.resetPassword.v1 } as ApiEndpoint,
    pathParams,
  })
}
