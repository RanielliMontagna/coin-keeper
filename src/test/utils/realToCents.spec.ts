import { realToCents } from 'utils/realToCents'

describe('@utils/realToCents', () => {
  it('should convert real to cents', () => {
    expect(realToCents(1)).toBe(100)
  })
})
