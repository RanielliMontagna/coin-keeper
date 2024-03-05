import Privacy from 'containers/privacy'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/privacy', () => {
  vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

  it('should render the Privacy container', () => {
    const { container } = renderWithProviders(<Privacy />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Privacy container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Privacy />)
    expect(container).toBeInTheDocument()
  })
})
