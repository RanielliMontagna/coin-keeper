import axios from 'axios'
import { getCookie } from 'helpers/cookies'

const axiosPublicInstance = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
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
