import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'

import { QuantunProvider } from '@quantun/core'

import { Router } from 'routes/routes'
import { theme } from 'styles/theme'
import { useAppStore } from 'store/app/app'
import { queryClient } from 'libs/react-query'
import { useIsMobile } from 'hooks/useIsMobile'
import { TransactionsProvider } from 'contexts/transactions/transactions.context'

function App() {
  const { isMobile } = useIsMobile()
  const { theme: colorScheme } = useAppStore()

  return (
    <QueryClientProvider client={queryClient}>
      <QuantunProvider
        theme={{ ...theme, colorScheme }}
        notificationsProps={{ position: isMobile ? 'bottom-center' : 'bottom-right' }}
      >
        <TransactionsProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </TransactionsProvider>
      </QuantunProvider>
    </QueryClientProvider>
  )
}

export default App
