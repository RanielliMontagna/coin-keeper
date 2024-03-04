import Register from 'containers/register'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/register', () => {
  it('should render the Register container', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<Register />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Register container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Register />)
    expect(container).toBeInTheDocument()
  })
})
