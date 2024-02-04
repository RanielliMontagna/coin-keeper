import CreditCards from 'containers/creditCards'
import { renderWithProviders } from 'test/helpers'

describe('@containers/creditCards', () => {
  it('should render the CreditCards container', () => {
    const { container } = renderWithProviders(<CreditCards />)
    expect(container).toMatchSnapshot()
  })
})
