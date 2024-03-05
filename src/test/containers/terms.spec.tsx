import Terms from 'containers/terms'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/terms', () => {
  it('should render the Terms container', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<Terms />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Terms container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Terms />)
    expect(container).toBeInTheDocument()
  })
})
