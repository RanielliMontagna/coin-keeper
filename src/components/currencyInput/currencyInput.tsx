import { TextInputProps, TextInput } from '@mantine/core'
import { currencyFormat } from 'utils/currencyFormat'

export function CurrencyInput(props: TextInputProps) {
  const floatParser = (value: string | number) => {
    const onlyNums = String(value).replace(/[^\d]/g, '')
    const digits = 2

    if (!onlyNums) return onlyNums

    const number = onlyNums.padStart(digits, '0')
    const integerPart = number.slice(0, number.length - digits)
    const decimalPart = number.slice(number.length - digits)

    return parseFloat(`${integerPart}.${decimalPart}`).toFixed(digits)
  }

  const value = currencyFormat(Number(props.value), { minimumFractionDigits: 2 })

  return (
    <TextInput
      {...props}
      value={value}
      onChange={(event) => {
        const value = floatParser(event?.target?.value) as string
        event.target.value = value

        props.onChange?.(event)
      }}
    />
  )
}
