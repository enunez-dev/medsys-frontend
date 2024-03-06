// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { toast } from 'react-hot-toast'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data })
          })
          .catch(() => {
            router.replace('/login')
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    const url = 'https://medsys-backend.onrender.com/auth';

    const body = {
      "email": params.email,
      "password": params.password
    }
    axios
      .post(url, body)
      .then(response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data)
          : null
        const returnUrl = router.query.returnUrl
        const data = { ...response.data, role: 'admin' }
        setUser({ ...data })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify({ ...data })) : null
        const redirectURL = returnUrl && returnUrl !== '/scheduler' ? returnUrl : '/scheduler'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handRegister = (params) => {
    const url = 'https://medsys-backend.onrender.com/patient/register';

    const body = {
      "fullName": params.fullName,
      "birthday": params.birthday,
      "sexo": params.sex,
      "email": params.email,
      "password": params.password
    }
    axios
      .post(url, body)
      .then(response => {
        console.log(response)
        if (response?.data?.data == '1') {
          router.push('/login')
          toast.success('Creado correctamente');
          window.localStorage.setItem('userNew', params.email)
        }
        else {
          toast.error('Error al guardar')
        }

      })
      .catch(err => {
        console.log(err)

        // if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
