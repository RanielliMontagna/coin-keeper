import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'

import { QuantunProvider } from '@quantun/core'

import { Router } from 'routes/routes'
import { theme } from 'styles/theme'
import { useAppStore } from 'store/app/app'
import { queryClient } from 'libs/react-query'
import { useIsMobile } from 'hooks/useIsMobile'

function App() {
  const { isMobile } = useIsMobile()
  const { theme: colorScheme } = useAppStore()

  return (
    <QueryClientProvider client={queryClient}>
      <QuantunProvider
        theme={{ ...theme, colorScheme }}
        notificationsProps={{ position: isMobile ? 'bottom-center' : 'bottom-right' }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QuantunProvider>
    </QueryClientProvider>
  )
}

export default App
