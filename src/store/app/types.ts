import { ColorScheme } from '@mantine/core'

type Loading = boolean

export interface AppState {
  loading: Loading
  theme: ColorScheme
}

export interface AppStore extends AppState {
  setLoading: (loading: Loading) => void
  setTheme: (theme: ColorScheme) => void
  clearStore: () => void
}
