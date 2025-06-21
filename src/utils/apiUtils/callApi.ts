import axios, { AxiosRequestConfig, Method } from 'axios'
import { getItem } from './localStorageControl'

export const socketHostname = () => 'wss://api-v1.emirouq.ae'
// export const socketHostname = () => 'wss://localhost:4000';
export const hostname = () => {
  // const hostUrl = 'http://192.168.29.91:4001'
  // const hostUrl = 'http://127.0.0.1:4001'
  const hostUrl = 'https://api-v1.emirouq.ae'

  return hostUrl
}

const authHeader = (): Record<string, string> => ({
  Authorization: getItem('accessToken') || '',
})

const client = axios.create({
  baseURL: hostname(),
  headers: {
    'Content-Type': 'application/json',
  },
})

interface UriEndPoint {
  uri: string
  version: string
  method: Method
}

interface CallApiParams {
  uriEndPoint: UriEndPoint
  body?: Record<string, unknown>
  query?: Record<string, string>
  pathParams?: Record<string, string>
  additionalHeaders?: Record<string, string>
  signal?: AbortSignal
}

export const makeUrl = ({
  uri,
  pathParams,
  query,
}: {
  uri: string
  pathParams?: Record<string, string>
  query?: Record<string, string>
}): string => {
  const queryString = query
    ? Object?.keys(query)
        .map(
          (key: string) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&')
    : ''
  return `${uri
    .split('/')
    .map((param) =>
      param.charAt(0) === ':' && pathParams
        ? encodeURI(pathParams[param.slice(1)])
        : param
    )
    .join('/')}${queryString ? `?${queryString}` : ''}`
}
export const callApi = async ({
  uriEndPoint,
  body,
  query,
  pathParams,
  additionalHeaders,
  signal,
}: CallApiParams) =>
  new Promise((resolve, reject) => {
    const url = makeUrl({
      uri: uriEndPoint.version + uriEndPoint.uri,
      pathParams,
      query,
    })

    const options: AxiosRequestConfig = {
      method: uriEndPoint.method,
      url,
      headers: { ...authHeader(), ...additionalHeaders },
      data: body,
      ...(signal ? { signal } : {}),
    }

    client(options)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error?.response?.data?.error)
      })
  })
