import Dashboard from 'containers/dashboard'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/dashboard', () => {
  it('should render the Dashboard container', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<Dashboard />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Dashboard container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Dashboard />)
    expect(container).toBeInTheDocument()
  })
})
