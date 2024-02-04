import { currencyFormat } from 'utils/currencyFormat'

describe('@utils/currencyFormat', () => {
  it('should format currency', () => {
    expect(currencyFormat(100)).includes('R$')
  })

  it('should format currency with currency option', () => {
    expect(currencyFormat(100, { currency: 'USD' })).includes('US$')
  })
})
