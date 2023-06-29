import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useMediaQuery } from '@mantine/hooks'

import { OutletContainer, PrivateLayoutContainer } from './styles'

import { useAppStore } from 'store/app/app'
import { SideBar } from 'components/sidebar'
import { Loading } from 'components/loading'
import { PrivateHeader } from 'components/privateHeader'
import { useAuthStore } from 'store/auth/auth'
import { useNotification } from 'hooks/useNotification'

export function PrivateLayout() {
  const { refreshToken } = useAuthStore()
  const { loading } = useAppStore()
  const { pathname } = useLocation()
  const matches = useMediaQuery('(min-width: 768px')

  // Hooks to show notifications
  useNotification()

  const pathnamesNotShowHeader = ['/404', '/500', '/terms', '/privacy']

  useEffect(() => {
    // Refresh token once the app is loaded
    refreshToken()
  }, [])

  if (pathnamesNotShowHeader.some((path) => pathname.includes(path))) {
    return <Outlet />
  }

  if (matches === undefined) {
    return <Loading />
  }

  return (
    <PrivateLayoutContainer mobile={!matches}>
      {!matches ? <PrivateHeader /> : <SideBar />}
      {loading && <Loading />}
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </PrivateLayoutContainer>
  )
}
