import { QueryClient, QueryClientProvider } from 'react-query'

import { RenderOptions, render } from '@testing-library/react'
import { QuantunProvider } from '@quantun/core'

import { theme } from 'styles/theme'

const queryClient = new QueryClient({})

function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <QuantunProvider theme={{ ...theme }}>{children}</QuantunProvider>
    </QueryClientProvider>
  )
}

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: Providers, ...options })
}
