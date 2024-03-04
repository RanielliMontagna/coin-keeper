import { act } from '@testing-library/react'

import { DateInput } from 'components/dateInput/dateInput'
import { renderWithProviders } from 'test/helpers'

describe('Components/DateInput', () => {
  it('should render', () => {
    const { container } = renderWithProviders(<DateInput value={new Date()} onChange={() => {}} />)
    expect(container).toBeInTheDocument()
  })

  it('should be able to click on the calendar icon', () => {
    const { container, getByTestId } = renderWithProviders(
      <DateInput value={new Date()} onChange={() => {}} />,
    )

    act(() => {
      const calendarIcon = getByTestId('calendar-icon')

      calendarIcon?.click()
    })

    expect(container).toBeInTheDocument()
  })
})
