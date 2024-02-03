import Register from 'containers/register'
import { renderWithProviders } from 'test/helpers'

describe('@containers/register', () => {
  it('should render the Register container', () => {
    const { container } = renderWithProviders(<Register />)
    expect(container).toMatchSnapshot()
  })
})
