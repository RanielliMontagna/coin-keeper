import { toLowerCase } from 'utils/toLowerCase'

describe('@utils/toLowerCase', () => {
  it('should convert string to lower case', () => {
    expect(toLowerCase('HELLO')).toBe('hello')
  })
})
