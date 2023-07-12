import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { OutletContainer, PrivateLayoutContainer } from './styles'

import { useAppStore } from 'store/app/app'
import { useAuthStore } from 'store/auth/auth'

import { useNotification } from 'hooks/useNotification'
import { useIsMobile } from 'hooks/useIsMobile'

import { SideBar } from 'components/sidebar'
import { Loading } from 'components/loading'
import { BottomBar } from 'components/bottomBar'

export function PrivateLayout() {
  const { refreshToken } = useAuthStore()
  const { loading } = useAppStore()
  const { pathname } = useLocation()
  const { isMobile } = useIsMobile()

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

  if (isMobile === undefined) {
    return <Loading />
  }

  return (
    <PrivateLayoutContainer mobile={isMobile}>
      {!isMobile && <SideBar />}
      {loading && <Loading />}
      {isMobile && <BottomBar />}
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </PrivateLayoutContainer>
  )
}
