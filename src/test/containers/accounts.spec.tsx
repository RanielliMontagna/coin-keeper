import Accounts from 'containers/privacy'
import { renderWithProviders } from 'test/helpers'

describe('@containers/privacy', () => {
  it('should render the Accounts container', () => {
    const { container } = renderWithProviders(<Accounts />)
    expect(container).toMatchSnapshot()
  })
})
