import { create } from 'zustand'
import jwtDecode from 'jwt-decode'

import { AuthState, AuthStore, UserTokenDecoded } from './types'

import { deleteCookie, getCookie, setCookie } from 'helpers/cookies'
import { useAppStore } from 'store/app/app'
import { login, refreshToken, register } from 'api/auth/auth'
import { axiosInstanceWithAuth } from 'libs/axios'
import { setLocal } from 'helpers/localStorage'

const tokenCookieName = 'token'

const initialState: AuthState = {
  token: getCookie(tokenCookieName) || null,
  user: null,
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  login: async ({ email, password }) => {
    useAppStore.getState().setLoading(true)
    try {
      const { data } = await login({ email, password })

      const decodedToken = jwtDecode(data.token) as UserTokenDecoded

      setLocal('email', email)
      get().setToken(data.token)
      get().setUser({
        sub: decodedToken.sub,
        type: decodedToken.type,
      })
    } catch (err) {
      useAppStore.getState().handleErrors(err)
    } finally {
      useAppStore.getState().setLoading(false)
    }
  },
  logout: async () => {
    try {
      deleteCookie(tokenCookieName)
      set({ token: null, user: null })
    } catch (err) {
      console.error(err)
    }
  },
  setToken: (token) => {
    setCookie({ name: tokenCookieName, value: token })
    axiosInstanceWithAuth.defaults.headers.Authorization = `Bearer ${token}`
    set({ token })
  },
  setUser: (user) => set({ user }),
  clearStore: () => set(initialState),
  refreshToken: async () => {
    const { data } = await refreshToken()
    get().setToken(data.token)
  },
  register: async ({ name, email, password, confirmPassword }) => {
    useAppStore.getState().setLoading(true)

    try {
      await register({
        name,
        email,
        password,
        confirmPassword,
      })

      useAppStore.getState().addNotification({
        title: 'Registration successful',
        message: 'You can now login',
      })

      setLocal('email', email)
    } catch (err) {
      useAppStore.getState().handleErrors(err)
    } finally {
      useAppStore.getState().setLoading(false)
    }
  },
}))
