import Privacy from 'containers/privacy'
import { renderWithProviders } from 'test/helpers'

describe('@containers/privacy', () => {
  it('should render the Privacy container', () => {
    const { container } = renderWithProviders(<Privacy />)
    expect(container).toMatchSnapshot()
  })
})
