import { DescriptionRowRender } from 'components/descriptionRowRender/descriptionRowRender'
import { renderWithProviders } from 'test/helpers'

describe('Components/DescriptionRowRender', () => {
  it('should render', () => {
    const { container } = renderWithProviders(<DescriptionRowRender description="teste" />)
    expect(container).toBeInTheDocument()
  })
})
