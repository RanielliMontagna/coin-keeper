import { act } from '@testing-library/react'

import { Modal } from 'components/modal'
import { renderWithProviders } from 'test/helpers'
import { useIsMobile } from 'hooks/useIsMobile'

vi.mock('hooks/useIsMobile')

describe('Components/Modal', () => {
  it('should render', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })

    const { container } = renderWithProviders(<Modal onClose={() => {}} />)
    expect(container).toBeInTheDocument()
  })

  it('should render on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Modal onClose={() => {}} />)
    expect(container).toBeInTheDocument()
  })

  it('should call onClose', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    // get close button with class // class="mantine-UnstyledButton-root mantine-ActionIcon-root mantine-CloseButton-root mantine-Modal-close mantine-1t0gh1s"
    const { container, getByRole } = renderWithProviders(<Modal onClose={() => {}} />)

    act(() => {
      const closeButton = getByRole('button')

      closeButton.click()
    })

    expect(container).toBeInTheDocument()
  })
})
