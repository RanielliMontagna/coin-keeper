import { render, screen } from '@testing-library/react'

import Login from '@/containers/login/login'

describe('Login', () => {
  it('should render h1', () => {
    render(<Login />)
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })
})
