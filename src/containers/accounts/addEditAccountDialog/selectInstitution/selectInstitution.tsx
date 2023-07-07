import { forwardRef } from 'react'

import { Flex, Select, SelectItemProps, Image } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { capitalize } from 'utils/capitalize'

import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import type { AddEditAccountSchema } from '../addEditAccountDialog.schema'
import { institutionLogoMap } from 'containers/accounts/accounts.static'

export function SelectInstitution({ form }: { form: UseFormReturnType<AddEditAccountSchema> }) {
  const institution = form.values.institution as InstitutionTypeEnum

  return (
    <Select
      icon={institution && <Image src={institutionLogoMap[institution]} width={24} height={24} />}
      label="Institution"
      {...form.getInputProps('institution')}
      data={Object.values(InstitutionTypeEnum).map((institution) => ({
        value: institution,
        label:
          institution === InstitutionTypeEnum.BANCO_DO_BRASIL
            ? 'Banco do Brasil'
            : capitalize(institution),
      }))}
      placeholder="Select institution"
      styles={{ itemsWrapper: { height: '150px' } }}
      itemComponent={forwardRef(function SelectItem(
        { value, label, ...rest }: SelectItemProps,
        ref: React.Ref<HTMLDivElement>,
      ) {
        return (
          <Flex ref={ref} gap={8} {...rest}>
            <Flex>
              <Image
                src={institutionLogoMap[value as InstitutionTypeEnum]}
                width={24}
                height={24}
              />
            </Flex>
            {label}
          </Flex>
        )
      })}
    />
  )
}
