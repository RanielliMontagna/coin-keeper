import { render } from '@testing-library/react'
import { Home } from 'containers/home'

describe('Home', () => {
  it('should render correctly', () => {
    const { container } = render(<Home />)
    expect(container).toBeTruthy()
  })
})
