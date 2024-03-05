import { QuantunProvider } from '@quantun/core'
import { render } from '@testing-library/react'

import Login from 'containers/login'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/login', () => {
  it('should render without crashing', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = render(
      <QuantunProvider theme={{}}>
        <Login />
      </QuantunProvider>,
    )
    expect(container).toBeTruthy()
  })

  it('should render dark mode without crashing', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = render(
      <QuantunProvider theme={{ colorScheme: 'dark' }}>
        <Login />
      </QuantunProvider>,
    )
    expect(container).toBeTruthy()
  })
})
