export function currencyFormat(value: number, options?: Intl.NumberFormatOptions): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: options?.currency || 'BRL',
    ...options,
  })
}
