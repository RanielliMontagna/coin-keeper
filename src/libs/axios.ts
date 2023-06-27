import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
})

const axiosInstanceWithAuth = axios.create({
  baseURL: 'http://localhost:3333',
})

export { axiosInstance, axiosInstanceWithAuth }
