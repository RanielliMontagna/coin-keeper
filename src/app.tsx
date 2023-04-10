import { BrowserRouter } from 'react-router-dom'

import { QuantunProvider } from '@quantun/core'

import { Router } from 'routes/routes'
import { theme } from 'styles/theme'
import { useAppStore } from 'store/app/app'

function App() {
  const { theme: colorScheme } = useAppStore()

  return (
    <QuantunProvider theme={{ ...theme, colorScheme }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QuantunProvider>
  )
}

export default App
