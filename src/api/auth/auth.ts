import { urls } from 'api/urls'
import { axiosInstance, axiosInstanceWithAuth } from 'libs/axios'

import type { LoginPayload, RegisterPayload } from './auth.types'

export async function login(payload: LoginPayload) {
  return await axiosInstance.post(urls.login, payload)
}

export async function register(payload: RegisterPayload) {
  return await axiosInstance.post(urls.users, payload)
}

export async function refreshToken() {
  return await axiosInstanceWithAuth.patch(urls.refreshToken)
}
