import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { create } from 'zustand'

import { AuthState, AuthStore } from './types'

import { deleteCookie, getCookie, setCookie } from 'helpers/cookies'
import app from 'libs/firebase'
import { useAppStore } from 'store/app/app'

const tokenCookieName = 'token'
const auth = getAuth(app)

const initialState: AuthState = {
  token: getCookie(tokenCookieName) || null,
  user: null,
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  login: async () => {
    useAppStore.getState().setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const credential = GoogleAuthProvider.credentialFromResult(result)

      const token = credential?.accessToken
      const user = result.user

      if (!token || !user) {
        throw new Error('Não foi possível fazer login')
      }

      window.location.href = '/'

      get().setToken(token)
      get().setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      })

      return { token, user }
    } catch (err) {
      console.error(err)
    } finally {
      useAppStore.getState().setLoading(false)
    }
  },
  logout: async () => {
    try {
      await signOut(auth)

      deleteCookie(tokenCookieName)
      set({ token: null, user: null })
    } catch (err) {
      console.error(err)
    }
  },
  setToken: (token) => {
    setCookie({ name: tokenCookieName, value: token })
    set({ token })
  },
  setUser: (user) => set({ user }),
  clearStore: () => set(initialState),
}))
