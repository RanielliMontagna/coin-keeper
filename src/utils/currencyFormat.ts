export function currencyFormat(value: number, currency?: string): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: currency || 'BRL',
  })
}
