import Dashboard from 'containers/dashboard'
import { renderWithProviders } from 'test/helpers'

describe('@containers/dashboard', () => {
  it('should render the Dashboard container', () => {
    const { container } = renderWithProviders(<Dashboard />)
    expect(container).toMatchSnapshot()
  })
})
