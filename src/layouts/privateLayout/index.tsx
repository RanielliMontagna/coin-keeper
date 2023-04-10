import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import app from 'libs/firebase'
import { getAuth } from 'firebase/auth'

import { useMediaQuery } from '@mantine/hooks'

import { OutletContainer, PrivateLayoutContainer } from './styles'

import { useAuthStore } from 'store/auth/auth'
import { useAppStore } from 'store/app/app'
import { SideBar } from 'components/sidebar'
import { Loading } from 'components/loading'
import { PrivateHeader } from 'components/privateHeader'

export function PrivateLayout() {
  const { pathname } = useLocation()

  if (pathname === '/404' || pathname === '/termos' || pathname === '/privacidade') {
    return <Outlet />
  }

  const matches = useMediaQuery('(min-width: 768px')
  const { setUser } = useAuthStore()
  const { loading } = useAppStore()
  const auth = getAuth(app)

  //Responsável por verificar se o usuário está logado e setar o usuário no store
  useEffect(() => {
    const unsubscribe = auth?.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [auth])

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
