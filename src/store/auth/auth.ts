import { create } from 'zustand'
import jwtDecode from 'jwt-decode'

import { AuthState, AuthStore, UserTokenDecoded } from './types'

import { deleteCookie, getCookie, setCookie } from 'helpers/cookies'
import { useAppStore } from 'store/app/app'
import { login, refreshToken, register } from 'api/auth/auth'
import { setLocal } from 'helpers/localStorage'
import { queryClient } from 'libs/react-query'

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

      setLocal('email', email)
      get().setToken(data.token)
    } catch (err) {
      useAppStore.getState().handleErrors(err)
    } finally {
      useAppStore.getState().setLoading(false)
    }
  },
  logout: async () => {
    try {
      queryClient.clear()
      deleteCookie(tokenCookieName)
      set({ token: null, user: null })
    } catch (err) {
      console.error(err)
    }
  },
  setToken: (token) => {
    const decodedToken = jwtDecode(token) as UserTokenDecoded

    setCookie({ name: tokenCookieName, value: token })

    get().setUser({
      sub: decodedToken.sub,
      type: decodedToken.type,
    })

    set({ token })
  },
  setUser: (user) => set({ user }),
  clearStore: () => {
    useAppStore.getState().clearStore()
    set(initialState)
    deleteCookie(tokenCookieName)

    window.location.href = '/'
  },
  refreshToken: async () => {
    try {
      const { data } = await refreshToken()
      get().setToken(data.token)
    } catch (err) {
      useAppStore.getState().addNotification({
        color: 'yellow',
        title: 'Session expired',
        message: 'Please login again',
      })
      get().clearStore()
    }
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
