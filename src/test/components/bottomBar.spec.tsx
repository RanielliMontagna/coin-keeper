import { BottomBar } from 'components/bottomBar'

import { renderWithProviders } from 'test/helpers'

describe('Components/BottomBar', () => {
  it('should render', () => {
    const { container } = renderWithProviders(<BottomBar />)
    expect(container).toBeInTheDocument()
  })
})
