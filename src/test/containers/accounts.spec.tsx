import Accounts from 'containers/accounts'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('@containers/accounts', () => {
  it('should render the Accounts container', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<Accounts />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Accounts container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Accounts />)
    expect(container).toBeInTheDocument()
  })
})
