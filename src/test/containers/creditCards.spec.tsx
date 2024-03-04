import CreditCards from 'containers/creditCards'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/creditCards', () => {
  it('should render the CreditCards container', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<CreditCards />)
    expect(container).toBeInTheDocument()
  })

  it('should render the CreditCards container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<CreditCards />)
    expect(container).toBeInTheDocument()
  })
})
