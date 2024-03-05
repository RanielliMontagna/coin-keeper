import Transactions from 'containers/transactions'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/transactions', () => {
  it('should render the Transactions container', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<Transactions />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Transactions container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Transactions />)
    expect(container).toBeInTheDocument()
  })
})
