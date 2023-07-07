import { create } from 'zustand'
import { AxiosError } from 'axios'
import { uuid } from 'short-uuid'
import { useNetwork } from '@mantine/hooks'

import type { AppState, AppStore, ErrorBackendResponse } from './types'

const initialState: AppState = {
  loading: false,
  theme: (localStorage.getItem('theme') as AppState['theme']) || 'dark',
  notifications: [],
}

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,
  setLoading: (loading) => set({ loading }),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    set({ theme })
  },
  clearStore: () => set(initialState),
  handleErrors: (err: any) => {
    set({ loading: false })

    if (err?.name === 'AxiosError') {
      const axiosError = err as AxiosError<{
        message: string
        issues: Record<string, { _errors: string[] }>
      }>

      if (axiosError?.code === 'ERR_NETWORK') {
        get().addNotification({
          color: 'red',
          title: 'Network error',
          message: window.navigator.onLine ? 'Server is not responding' : 'No internet connection',
        })

        return
      }

      const issues = axiosError?.response?.data?.issues

      if (issues) {
        const firstIssue = Object.values(issues)[1]

        get().addNotification({
          color: 'red',
          title: axiosError?.response?.data?.message || 'An error occurred',
          message: firstIssue?._errors?.[0],
        })
      } else {
        const data = axiosError?.response?.data as ErrorBackendResponse

        if (data?.message && data?.title) {
          get().addNotification({
            color: 'red',
            title: data.title,
            message: data.message,
          })
        } else if (data.message) {
          get().addNotification({
            color: 'red',
            message: data.message,
          })
        } else {
          get().addNotification({
            color: 'red',
            title: 'An error occurred',
            message: 'Sorry, try again later',
          })
        }
      }
    } else {
      get().addNotification({
        color: 'red',
        title: 'An error occurred',
        message: err?.message || 'Sorry, try again later',
      })
    }
  },
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: uuid(),
        },
      ],
    })),
}))
