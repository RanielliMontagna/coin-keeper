import { create } from 'zustand'
import type { AppState, AppStore } from './app.types'

const initialState: AppState = {
  loading: false,
}

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  setLoading: (loading) => set({ loading }),
  clearStore: () => set(initialState),
}))
