import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getCurrentUser } from '@/utils/apiUtils/services/user'
import { useUserLogin } from '@/hooks/Auth/mutation'
import { useCreateUser } from '@/hooks/User/mutation'

const defaultProvider = {
  user: {},
  login: () => {},
  logout: () => {},
  currentUser: () => {},
  loading: false,
}
export const useAuth = () => useContext(AuthContext)
const AuthContext = createContext(defaultProvider as any)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({})
  const login: any = useUserLogin()
  const createCustomers: any = useCreateUser()
  const [loading, setLoading] = useState(false)
  const currentUser = useCallback(async () => {
    setLoading(true)
    getCurrentUser()
      .then((res: any) => {
        setUser(res?.data)
        setLoading(false)
      })
      .catch(() => {
        if (window.location.pathname !== '/sign-in-2') {
          window.location.href = '/sign-in-2'
        }
        setLoading(false)
      })
  }, [])
  useEffect(() => {
    currentUser()
  }, [currentUser])

  const createUser = useCallback(
    (body: any, cb: any, errCb: any) => {
      createCustomers
        .mutateAsync({
          body,
        })
        .then((res: any) => {
          cb(res)
        })
        .catch((err: any) => {
          errCb(err)
        })
    },
    [createCustomers]
  )
  const handleLogin = useCallback(
    (data: any, cb: any, errCb: any) => {
      login
        .mutateAsync({
          body: {
            email: data?.email,
            password: data?.password,
          },
        })
        .then(async (res: any) => {
          localStorage.setItem('accessToken', res?.accessToken)
          const response: any = await getCurrentUser()
          setUser(response?.data)
          cb()
        })
        .catch((err: any) => {
          errCb(err)
        })
    },
    [login]
  )
  const logout = useCallback((cb: any) => {
    localStorage.removeItem('accessToken')
    setUser({})
    cb()
  }, [])
  const values = useMemo(
    () => ({
      user,
      login: handleLogin,
      logout,
      currentUser,
      loading,
      createUser,
    }),
    [user, handleLogin, logout, currentUser, loading, createUser]
  )

  return (
    <AuthContext.Provider value={values as any}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
