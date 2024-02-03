import Transactions from 'containers/transactions'
import { renderWithProviders } from 'test/helpers'

describe('@containers/transactions', () => {
  it('should render the Transactions container', () => {
    const { container } = renderWithProviders(<Transactions />)
    expect(container).toMatchSnapshot()
  })
})
