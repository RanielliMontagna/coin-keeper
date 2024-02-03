import { QuantunProvider } from '@quantun/core'
import { fireEvent, render } from '@testing-library/react'

import Erro500 from 'containers/erro500'

describe('@containers/erro500', () => {
  it('should render without crashing', () => {
    const { container } = render(<Erro500 />)
    expect(container).toBeTruthy()
  })

  it('should render dark mode without crashing', () => {
    const { container } = render(
      <QuantunProvider theme={{ colorScheme: 'dark' }}>
        <Erro500 />
      </QuantunProvider>,
    )
    expect(container).toBeTruthy()
  })

  it('should redirect to home on click to button "Voltar para a página inicial"', () => {
    const { getByText } = render(<Erro500 />)
    const button = getByText('Go back to home page')

    fireEvent.click(button)

    expect(window.location.pathname).toBe('/')
  })
})
