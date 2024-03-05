import { HeaderButtons } from 'components/headerButtons'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'
import { IconPlus } from '@tabler/icons-react'

vi.mock('hooks/useIsMobile')

describe('Components/HeaderButtons', () => {
  it('should render', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(
      <HeaderButtons.Root>
        <HeaderButtons.Button label="Test" onClick={() => {}} />
      </HeaderButtons.Root>,
    )
    expect(container).toBeInTheDocument()
  })

  it('should render on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(
      <HeaderButtons.Root>
        <HeaderButtons.Button label="Test" onClick={() => {}} />
      </HeaderButtons.Root>,
    )
    expect(container).toBeInTheDocument()
  })

  it('should render with icon personalized', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(
      <HeaderButtons.Root>
        <HeaderButtons.Button label="Test" onClick={() => {}} icon={IconPlus} />
      </HeaderButtons.Root>,
    )
    expect(container).toBeInTheDocument()
  })

  it('should render with icon personalized on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(
      <HeaderButtons.Root>
        <HeaderButtons.Button label="Test" onClick={() => {}} icon={IconPlus} />
      </HeaderButtons.Root>,
    )
    expect(container).toBeInTheDocument()
  })
})
