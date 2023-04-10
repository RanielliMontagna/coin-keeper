import { create } from 'zustand'
import type { AppState, AppStore } from './types'

const initialState: AppState = {
  loading: false,
  theme: (localStorage.getItem('theme') as AppState['theme']) || 'dark',
}

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  setLoading: (loading) => set({ loading }),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    set({ theme })
  },
  clearStore: () => set(initialState),
}))
