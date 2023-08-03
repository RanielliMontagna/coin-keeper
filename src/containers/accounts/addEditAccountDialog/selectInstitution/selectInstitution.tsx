import { forwardRef } from 'react'

import { Flex, Select, SelectItemProps, Image } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { capitalizeAllAndRemoveUnderscore } from 'utils/capitalize'

import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import type { AddEditAccountSchema } from '../addEditAccountDialog.schema'
import { institutionLogoMap } from 'containers/accounts/accounts.static'

export function SelectInstitution({ form }: { form: UseFormReturnType<AddEditAccountSchema> }) {
  const institution = form.values.institution ? Number(form.values.institution) : null

  return (
    <Select
      icon={
        typeof institution === 'number' && (
          <Image
            src={institutionLogoMap[institution as InstitutionTypeEnum]}
            width={24}
            height={24}
          />
        )
      }
      label="Institution"
      {...form.getInputProps('institution')}
      data={new Array(Object.keys(institutionLogoMap)?.length).fill(0).map((_, index) => ({
        value: index.toString(),
        label: capitalizeAllAndRemoveUnderscore(InstitutionTypeEnum[index]),
      }))}
      placeholder="Select institution"
      styles={{ itemsWrapper: { height: '150px' } }}
      itemComponent={forwardRef(function SelectItem(
        { value, label, ...rest }: SelectItemProps,
        ref: React.Ref<HTMLDivElement>,
      ) {
        const institution = Number(value) as InstitutionTypeEnum

        return (
          <Flex ref={ref} gap={8} {...rest}>
            <Flex>
              <Image src={institutionLogoMap[institution]} width={24} height={24} />
            </Flex>
            {label}
          </Flex>
        )
      })}
    />
  )
}
