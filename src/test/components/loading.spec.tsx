import { render } from '@testing-library/react'

import { QuantunProvider } from '@quantun/core'
import { Loading } from 'components/loading'

describe('@components/loading', () => {
  it('should render without crashing', () => {
    const { container } = render(<Loading />)
    expect(container).toBeTruthy()
  })

  it('should render dark mode without crashing', () => {
    const { container } = render(
      <QuantunProvider theme={{ colorScheme: 'dark' }}>
        <Loading />
      </QuantunProvider>,
    )
    expect(container).toBeTruthy()
  })
})
