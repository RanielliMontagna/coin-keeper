import { centsToReal } from 'utils/centsToReal'

describe('@utils/centsToReal', () => {
  it('should convert cents to real', () => {
    expect(centsToReal(100)).toBe(1)
  })
})
