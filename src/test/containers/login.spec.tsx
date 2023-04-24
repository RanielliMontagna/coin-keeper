import { QuantunProvider } from '@quantun/core'
import { render } from '@testing-library/react'

import { Login } from '../../containers/login'

describe('@containers/login', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <QuantunProvider theme={{}}>
        <Login />
      </QuantunProvider>
    )
    expect(container).toBeTruthy()
  })
})
