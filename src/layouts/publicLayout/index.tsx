import { Outlet, useLocation } from 'react-router-dom'

import { Loading } from 'components/loading'
import { PublicHeader } from 'components/publicHeader'
import { useAppStore } from 'store/app/app'

import { OutletContainer } from './styles'
import { useMemo } from 'react'
import { useNotification } from 'hooks/useNotification'

export function PublicLayout() {
  const { loading } = useAppStore()
  const { pathname } = useLocation()

  // Hooks to show notifications
  useNotification()

  const showHeader = useMemo(() => {
    if (pathname === '/login') return false
    if (pathname === '/register') return false

    return true
  }, [pathname])

  return (
    <div>
      {loading && <Loading />}
      {showHeader && <PublicHeader />}
      <OutletContainer withHeader={showHeader}>
        <Outlet />
      </OutletContainer>
    </div>
  )
}
