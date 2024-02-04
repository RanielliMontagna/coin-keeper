import Accounts from 'containers/accounts'
import { renderWithProviders } from 'test/helpers'

describe('@containers/accounts', () => {
  it('should render the Accounts container', () => {
    const { container } = renderWithProviders(<Accounts />)
    expect(container).toMatchSnapshot()
  })
})
