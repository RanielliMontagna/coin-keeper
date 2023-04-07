import { render, screen } from '@testing-library/react'

import Login from '@/containers/login/login'

describe('Login', () => {
  it('should render h1', () => {
    render(<Login />)

    const heading = screen.getByRole('heading', { name: /login/i })

    expect(heading).toBeInTheDocument()
  })
})
