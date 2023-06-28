export function percentageFormat(value: number) {
  return value.toLocaleString('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
  })
}
