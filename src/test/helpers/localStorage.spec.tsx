import { getLocal, setLocal, removeLocal } from 'helpers/localStorage'

describe('@helpers/localStorage', () => {
  it('should set localStorage', () => {
    setLocal('number', 1)
    expect(localStorage.getItem('number')).toBe('1')
  })

  it("getLocal should return localStorage's value", () => {
    localStorage.setItem('number', '1')
    expect(getLocal('number')).toBe(1)
  })

  it('should remove localStorage', () => {
    localStorage.setItem('number', '1')
    removeLocal('number')
    expect(localStorage.getItem('test')).toBe(null)
  })
})
