import { percentageFormat } from 'utils/percentageFormat'

describe('@utils/percentageFormat', () => {
  it('should format percentage', () => {
    expect(percentageFormat(100)).includes('%')
  })
})
