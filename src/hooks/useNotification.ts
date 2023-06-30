import { notifications } from '@mantine/notifications'

import { useEffect } from 'react'
import { useAppStore } from 'store/app/app'

export function useNotification() {
  const { notifications: notificationsAppStore } = useAppStore()

  useEffect(() => {
    if (notificationsAppStore.length > 0) {
      const notification = notificationsAppStore[notificationsAppStore.length - 1]

      notifications.show(notification)

      useAppStore.setState((state) => ({
        notifications: state.notifications.filter((n) => n.id !== notification.id),
      }))
    }
  }, [notificationsAppStore])
}
