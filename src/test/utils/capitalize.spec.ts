import { capitalize, capitalizeAllAndRemoveUnderscore } from 'utils/capitalize'

describe('@utils/capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('should capitalize all words and remove underscores', () => {
    expect(capitalizeAllAndRemoveUnderscore('hello_world')).toBe('Hello World')
  })
})
