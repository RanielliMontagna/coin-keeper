import { urls } from 'api/urls'
import { axiosPublicInstance } from 'libs/axios'

import type { LoginPayload, RegisterPayload } from './auth.types'

export async function login(payload: LoginPayload) {
  return await axiosPublicInstance.post(urls.login, payload)
}

export async function register(payload: RegisterPayload) {
  return await axiosPublicInstance.post(urls.users, payload)
}

export async function refreshToken() {
  return await axiosPublicInstance.patch(urls.refreshToken, {})
}
