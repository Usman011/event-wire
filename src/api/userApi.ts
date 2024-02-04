import axiosInstance from 'api'
import { LoginProps } from 'pages/Login'
import { SignupProps } from 'pages/Signup'
import { store } from 'store'

export const URL = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/register',
  LOGOUT: 'auth/logout',
  GET_CATEGORIES: '/categories',
  POST_SERVICE: '/marketplace/service',
  GET_SERVICES: '/marketplace/services',
  GET_POPULAR_SERVICES: '/marketplace/services/popular',
  POST_JOB: '/jobs'
}

export const loginUserApi = (userData: LoginProps) => {
  let axiosConfig = {
    method: 'post',
    url: URL.LOGIN,
    data: userData
  }
  return axiosInstance(axiosConfig)
}

export const signupUserApi = (userData: SignupProps) => {
  let axiosConfig = {
    method: 'post',
    url: URL.SIGNUP,
    data: userData
  }
  return axiosInstance(axiosConfig)
}

export const logoutUserApi = () => {
  let axiosConfig = {
    method: 'post',
    url: URL.LOGOUT,
    data: {
      accessToken: store.getState().auth.token
    }
  }
  return axiosInstance(axiosConfig)
}

export const getServiceDetailApi = (id: number | string) => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_SERVICES}/${id}`
  }
  return axiosInstance(axiosConfig)
}

export const getAllCategoriesApi = ({ parent = '', sub = false }) => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_CATEGORIES}?parent=${parent}&sub=${sub}`
  }
  return axiosInstance(axiosConfig)
}

export const getAllCategoriesWithSubApi = () => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_CATEGORIES}/all`
  }
  return axiosInstance(axiosConfig)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNewServiceApi = (data: any) => {
  let axiosConfig = {
    method: 'post',
    url: URL.POST_SERVICE,
    data
  }
  return axiosInstance(axiosConfig)
}

export const createJobApi = (data: unknown) => {
  const config = {
    method: 'post',
    url: URL.POST_JOB,
    data
  }
  return axiosInstance(config)
}
