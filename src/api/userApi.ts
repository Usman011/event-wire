import axiosInstance from 'api'
import { LoginProps } from 'pages/Login'
import { SignupProps } from 'pages/Signup'
import { store } from 'store'

export const URL = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/register',
  LOGOUT: 'auth/logout',
  GET_SERVICES: '',
  GET_ALL_SERVICES: '',
  GET_CATEGORIES: '/categories'
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

export const getAllServicesByCategoryApi = () => {
  let axiosConfig = {
    method: 'get',
    url: URL.GET_ALL_SERVICES
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
