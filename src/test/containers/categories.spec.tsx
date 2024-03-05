import Categories from 'containers/categories'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/categories', () => {
  it('should render the Categories container', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<Categories />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Categories container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Categories />)
    expect(container).toBeInTheDocument()
  })
})
