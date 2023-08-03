import { forwardRef } from 'react'

import { Flex, Select, SelectItemProps, Image } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { institutionLogoMap } from 'containers/accounts/accounts.static'
import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import { AddEditCreditCardSchema } from '../addEditCreditCardDialog.schema'

interface Account {
  value: string
  label: string
  institution: InstitutionTypeEnum
}

interface ISelectAccountProps {
  form: UseFormReturnType<AddEditCreditCardSchema>
  accounts: Account[]
}

export function SelectAccount({ form, accounts }: ISelectAccountProps) {
  const selectedAccount = accounts.find((account) => account.value === form.values.account)

  return (
    <Select
      label="Account"
      placeholder="Select account"
      data={accounts}
      withAsterisk
      icon={
        selectedAccount && (
          <Image
            ml={2}
            src={institutionLogoMap[selectedAccount.institution]}
            width={20}
            height={20}
          />
        )
      }
      itemComponent={forwardRef(function SelectItem(
        { label, ...rest }: SelectItemProps & Account,
        ref: React.Ref<HTMLDivElement>,
      ) {
        return (
          <Flex ref={ref} gap={8} {...rest}>
            <Flex>
              <Image src={institutionLogoMap[rest.institution]} width={24} height={24} />
            </Flex>
            {label}
          </Flex>
        )
      })}
      {...form.getInputProps('account')}
    />
  )
}
