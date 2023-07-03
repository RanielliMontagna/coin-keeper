import { TextInputProps, TextInput } from '@mantine/core'
import { currencyFormat } from 'utils/currencyFormat'

interface ICurrencyInputProps extends TextInputProps {
  /**
   * If true, zero is allowed in the input
   * @default false
   *
   * @example
   * <CurrencyInput zeroIsAllowed />
   */
  zeroIsAllowed?: boolean
}

export function CurrencyInput({ zeroIsAllowed = false, ...props }: ICurrencyInputProps) {
  const floatParser = (value: string | number) => {
    const onlyNums = String(value).replace(/[^\d]/g, '')
    const digits = 2

    if (!onlyNums) return onlyNums

    const number = onlyNums.padStart(digits, '0')
    const integerPart = number.slice(0, number.length - digits)
    const decimalPart = number.slice(number.length - digits)

    return parseFloat(`${integerPart}.${decimalPart}`).toFixed(digits)
  }

  function _format(value: string | number) {
    if (!zeroIsAllowed && (value == '0.00' || !value)) return ''

    return currencyFormat(Number(value), { minimumFractionDigits: 2 })
  }

  return (
    <TextInput
      {...props}
      value={_format(props.value as string)}
      onChange={(event) => {
        const value = floatParser(event?.target?.value) as string
        event.target.value = value

        props.onChange?.(event)
      }}
    />
  )
}
