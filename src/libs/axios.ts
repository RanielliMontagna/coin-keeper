import axios from 'axios'
import { getCookie } from 'helpers/cookies'

const apiUrl = import.meta.env.VITE_API_URL

const axiosPublicInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
})

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
})

axiosPublicInstance.defaults.withCredentials = true

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => ({
    ...response,
    data: response?.data?.data || response?.data,
    meta: response?.data?.meta,
  }),
  (error) => Promise.reject(error),
)

export { axiosPublicInstance, axiosInstance }
