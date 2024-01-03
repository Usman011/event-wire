import axios from 'axios'
import { store } from 'store'
import { logout } from 'store/auth'
import { openToaster } from 'store/toast'

const BASE_URL = 'https://em-api-ca838e34c99a.herokuapp.com/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'B2535BDDCB3E8EA46F326A7E5C2F7'
  }
})

axiosInstance.interceptors.request.use(
  function (config) {
    config.params = config.params || {}
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function async(response) {
    return response
  },
  function (error) {
    console.log('error', error)
    store.dispatch(
      openToaster({
        type: 'error',
        message: error.response
          ? error.response.data.message
          : 'Something went wrong. Contact support team'
      })
    )

    console.log(error.response.data.statusCode, error.response.data.statusCode === 401)
    if (error.response.data.statusCode === 401) {
      logout()
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
