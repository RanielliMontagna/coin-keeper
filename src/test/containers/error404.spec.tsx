import { QuantunProvider } from '@quantun/core'
import { fireEvent, render } from '@testing-library/react'

import Erro404 from 'containers/erro404'

describe('@containers/erro404', () => {
  it('should render without crashing', () => {
    const { container } = render(<Erro404 />)
    expect(container).toBeTruthy()
  })

  it('should render dark mode without crashing', () => {
    const { container } = render(
      <QuantunProvider
        theme={{
          colorScheme: 'dark',
        }}
      >
        <Erro404 />
      </QuantunProvider>,
    )
    expect(container).toBeTruthy()
  })

  it('should redirect to home on click to button "Voltar para a página inicial"', () => {
    const { getByText } = render(<Erro404 />)
    const button = getByText('Go back to home page')

    fireEvent.click(button)

    expect(window.location.pathname).toBe('/')
  })
})
