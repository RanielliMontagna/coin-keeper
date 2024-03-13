import { forwardRef } from 'react'

import { Flex, Image, Select, SelectItemProps } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { AddTransactionSchema } from '../addTransactionDialog.schema'
import { FlagEnum } from 'api/creditCards/creditCards.types'

import { flagLogoMap } from 'containers/creditCards/creditCards.static'

interface ISelectCreditCardProps {
  form: UseFormReturnType<AddTransactionSchema>
  creditCards: { value: string; label: string; flag: FlagEnum }[]
}

export function SelectCreditCard({ form, creditCards }: ISelectCreditCardProps) {
  const selectedCreditCard = creditCards.find((credit) => credit.value === form.values.creditCard)

  return (
    <Select
      label="Credit card"
      placeholder="Select credit card"
      data={creditCards}
      withAsterisk
      icon={
        selectedCreditCard && (
          <Image ml={2} src={flagLogoMap[selectedCreditCard.flag]} width={25} height={15} />
        )
      }
      itemComponent={forwardRef(function SelectItem(
        { label, ...rest }: SelectItemProps & { flag: FlagEnum },
        ref: React.Ref<HTMLDivElement>,
      ) {
        const flag = Number(rest.flag) as FlagEnum

        return (
          <Flex ref={ref} gap={8} {...rest}>
            <img src={flagLogoMap[flag]} width={35} />
            {label}
          </Flex>
        )
      })}
      {...form.getInputProps('creditCard')}
    />
  )
}
