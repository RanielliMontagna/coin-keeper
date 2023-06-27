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

  const { pathname } = useLocation()

  // Hooks to show notifications
  useNotification()

  if (pathname === '/404' || pathname === '/terms' || pathname === '/privacy') {
    return <Outlet />
  }

  const matches = useMediaQuery('(min-width: 768px')
  const { loading } = useAppStore()

  //TODO: validar se o usuário está logado
  useEffect(() => {
    refreshToken()
  }, [])

  return (
    <PrivateLayoutContainer mobile={!matches}>
      {matches ? <SideBar /> : <PrivateHeader />}
      {loading && <Loading />}
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </PrivateLayoutContainer>
  )
}
