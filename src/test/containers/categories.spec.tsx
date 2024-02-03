import Categories from 'containers/categories'
import { renderWithProviders } from 'test/helpers'

describe('@containers/categories', () => {
  it('should render the Categories container', () => {
    const { container } = renderWithProviders(<Categories />)
    expect(container).toMatchSnapshot()
  })
})
