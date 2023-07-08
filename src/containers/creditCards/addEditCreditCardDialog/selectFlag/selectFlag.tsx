import { forwardRef } from 'react'

import { Center, Flex, Image, Select, SelectItemProps } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { FlagEnum } from 'api/creditCards/creditCards.types'

import { AddEditCreditCardSchema } from '../addEditCreditCardDialog.schema'
import { flagLogoMap } from 'containers/creditCards/creditCards.static'
import { capitalizeAllAndRemoveUnderscore } from 'utils/capitalize'

interface ISelectFlagProps {
  form: UseFormReturnType<AddEditCreditCardSchema>
}

export function SelectFlag({ form }: ISelectFlagProps) {
  return (
    <Select
      label="Flag"
      placeholder="Select flag"
      withAsterisk
      iconWidth={45}
      icon={
        form.values.flag && (
          <Center>
            <img src={flagLogoMap[form.values.flag as FlagEnum]} width={35} />
          </Center>
        )
      }
      data={Object.keys(FlagEnum).map((flag) => ({
        value: flag,
        label: capitalizeAllAndRemoveUnderscore(flag),
      }))}
      itemComponent={forwardRef(function SelectItem(
        { label, ...rest }: SelectItemProps,
        ref: React.Ref<HTMLDivElement>,
      ) {
        return (
          <Flex ref={ref} gap={8} {...rest}>
            <Flex>
              <Image src={flagLogoMap[rest.value as FlagEnum]} width={35} />
            </Flex>
            {label}
          </Flex>
        )
      })}
      {...form.getInputProps('flag')}
    />
  )
}
