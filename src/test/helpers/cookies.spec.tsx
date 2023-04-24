import { getCookie, setCookie, deleteCookie } from 'helpers/cookies'

describe('@helpers/cookies', () => {
  it('should set cookie', () => {
    setCookie({
      name: 'test',
      value: 'test',
    })
    expect(document.cookie).toBe('test=test')
  })

  it("getCookie should return 'test' when cookie is 'test=test'", () => {
    document.cookie = 'test=test'
    expect(getCookie('test')).toBe('test')
  })

  it('should delete cookie', () => {
    document.cookie = 'test=test'
    deleteCookie('test')
    expect(document.cookie).toBe('')
  })
})
