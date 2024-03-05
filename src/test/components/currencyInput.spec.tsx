import { act, fireEvent } from '@testing-library/react'
import { CurrencyInput } from 'components/currencyInput/currencyInput'

import { renderWithProviders } from 'test/helpers'

describe('Components/CurrencyInput', () => {
  it('should render', () => {
    const { container } = renderWithProviders(<CurrencyInput value={0} onChange={() => {}} />)
    expect(container).toBeInTheDocument()
  })

  it('should be able to click and change the value', () => {
    const { container, getByRole } = renderWithProviders(
      <CurrencyInput value={0} onChange={() => {}} />,
    )

    act(() => {
      const input = getByRole('textbox')

      fireEvent.change(input, { target: { value: '100' } })
    })

    expect(container).toBeInTheDocument()
  })

  it('should be able to click and change the value with zeroIsAllowed', () => {
    const { container, getByRole } = renderWithProviders(
      <CurrencyInput value={0} onChange={() => {}} zeroIsAllowed />,
    )

    act(() => {
      const input = getByRole('textbox')

      fireEvent.change(input, { target: { value: '100' } })
    })

    expect(container).toBeInTheDocument()
  })

  it('should not show the input value if it is not a number', () => {
    const { container, getByRole } = renderWithProviders(
      <CurrencyInput value={0} onChange={() => {}} />,
    )

    act(() => {
      const input = getByRole('textbox')

      fireEvent.change(input, { target: { value: 'a' } })
    })

    expect(container).toBeInTheDocument()
  })
})
