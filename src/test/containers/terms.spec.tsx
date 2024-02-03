import Terms from 'containers/terms'
import { renderWithProviders } from 'test/helpers'

describe('@containers/terms', () => {
  it('should render the Terms container', () => {
    const { container } = renderWithProviders(<Terms />)
    expect(container).toMatchSnapshot()
  })
})
