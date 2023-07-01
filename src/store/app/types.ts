import { ColorScheme } from '@mantine/core'
import { NotificationProps } from '@mantine/notifications'

type Loading = boolean

export interface AppState {
  loading: Loading
  theme: ColorScheme
  notifications: NotificationProps[]
}

export interface ErrorBackendResponse {
  title?: string
  message: string
}

export interface AppStore extends AppState {
  setLoading: (loading: Loading) => void
  setTheme: (theme: ColorScheme) => void
  clearStore: () => void
  handleErrors: (err: unknown) => void
  addNotification: (notification: NotificationProps) => void
}
