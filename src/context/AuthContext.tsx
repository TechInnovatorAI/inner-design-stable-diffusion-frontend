// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import api from 'src/configs/api'

// ** Types
// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  RegisterParams,
  FrogotPasswordParams,
  ResetPasswordParamse,
  VerifyemailParams
} from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  forgotpassword: () => Promise.resolve(),
  resetpassword: () => Promise.resolve(),
  verifyemail: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  const refreshTokenAuth = async () => {
    const refreshToken = await localStorage.getItem(authConfig.onTokenExpiration)
    if (refreshToken) {
      await axios
        .post(api.API + authConfig.refreshEndpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + refreshToken
          }
        })
        .then(async response => {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.tokens.accessToken)
          window.localStorage.setItem(authConfig.onTokenExpiration, response.data.tokens.refreshToken)
        })
        .catch(() => {
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        })
    }
  }

  useEffect(() => {
    console.log('-----------Loading--------------')
    const initAuth = async (): Promise<void> => {
      const storedToken = await window.localStorage.getItem(authConfig.storageTokenKeyName)!
      const userData: any = await JSON.parse(localStorage.getItem('userData') as string)
      if (storedToken) {
        const returnUrl = router.pathname
        setLoading(true)
        const config = {
          method: 'post',
          url: api.API + authConfig.meEndpoint,
          headers: {
            'Context-Type': 'application/json',
            Authorization: 'Bearer ' + storedToken
          },
          data: {
            email: userData.email
          }
        }
        await axios(config)
          .then(async response => {
            setLoading(false)
            console.log(returnUrl)
            if (returnUrl == '/') router.replace('/acl')
            setUser({ ...response.data })
          })
          .catch(() => {
            refreshTokenAuth()
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    console.log('sign up url', api.API + authConfig.loginEndpoint)
    const config = {
      method: 'post',
      url: api.API + authConfig.loginEndpoint,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: params.email,
        password: params.password
      }
    }
    axios(config)
      .then(async response => {
        await window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.tokens.accessToken)
        await window.localStorage.setItem(authConfig.onTokenExpiration, response.data.tokens.refreshToken)

        // const returnUrl = router.query.returnUrl

        setUser({ ...response.data.userInfo })
        await window.localStorage.setItem('userData', JSON.stringify(response.data.userInfo))

        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        if (response.data.userInfo.role == 'client') {
          router.replace('/acl')
        } else {
          router.replace('/admin/users')

          // router.replace(redirectURL as string)
        }
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.onTokenExpiration)
    router.push('/auth/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    const config = {
      method: 'post',
      url: api.API + authConfig.registerEndpoint,
      headers: {
        'Context-Type': 'application/json'
      },
      data: {
        name: params.username,
        email: params.email,
        password: params.password
      }
    }
    axios(config)
      .then(async response => {
        if (response.data.sendverifymailstate) {
          router.push(`/auth/verify-email?email=${response.data.email}`)
        }
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleForgotpassword = (params: FrogotPasswordParams, errorCallback?: ErrCallbackType) => {
    const config = {
      method: 'post',
      url: api.API + authConfig.forgotpasswordEndpoint,
      headers: {
        'Context-Type': 'application/json'
      },
      data: {
        email: params.email
      }
    }
    axios(config)
      .then(async response => {
        if (response.data.sendmailState) router.push('/auth/verify-email')
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleResetpassword = (params: ResetPasswordParamse, errorCallback?: ErrCallbackType) => {
    const config = {
      method: 'post',
      url: api.API + authConfig.resetpasswordEndpoint,
      header: {
        'Context-Type': 'application/json'
      },
      data: {
        verifytoken: params.accessToken,
        password: params.password
      }
    }
    axios(config)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.tokens.accessToken)
        window.localStorage.setItem(authConfig.onTokenExpiration, response.data.tokens.refreshToken)
        setUser({ ...response.data.userInfo })
        await window.localStorage.setItem('userData', JSON.stringify(response.data.userInfo))
        if (response.data.userInfo.role == 'client') {
          router.replace('/acl')
        } else {
          router.replace('/admin/users')
        }
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleVerifyemail = (params: VerifyemailParams, errorCallback?: ErrCallbackType) => {
    const config = {
      method: 'post',
      url: api.API + authConfig.verifyemailEndpoint,
      header: {
        'Context-Type': 'application/json'
      },
      data: {
        verifytoken: params.tokenParam
      }
    }
    axios(config)
      .then(async response => {
        await window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.tokens.accessToken)
        await window.localStorage.setItem(authConfig.onTokenExpiration, response.data.tokens.refreshToken)
        setUser({ ...response.data.userInfo })
        await window.localStorage.setItem('userData', JSON.stringify(response.data.userInfo))

        // const returnUrl = router.query.returnUrl
        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        // if (response.data.userInfo.role == 'client') {
        //   router.replace('/')
        // } else {
        // }

        if (response.data.userInfo.role == 'client') {
          router.replace('/acl')
        } else {
          router.replace('/admin/users')

          // router.replace(redirectURL as string)
        }
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    forgotpassword: handleForgotpassword,
    resetpassword: handleResetpassword,
    verifyemail: handleVerifyemail
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
