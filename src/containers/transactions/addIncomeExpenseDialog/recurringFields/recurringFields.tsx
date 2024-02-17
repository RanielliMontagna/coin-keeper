import { Flex, Select, Text, Tooltip } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { DateInput } from 'components/dateInput/dateInput'

import { AddIncomeExpenseSchema } from '../addIncomeExpenseDialog.schema'
import { IconInfoHexagon } from '@tabler/icons-react'

export enum FrequencyEnum {
  WEEKLY = '0',
  MONTHLY = '1',
  YEARLY = '2',
}

export const FrequencyOptions = [
  { value: FrequencyEnum.WEEKLY, label: 'Weekly' },
  { value: FrequencyEnum.MONTHLY, label: 'Monthly' },
  { value: FrequencyEnum.YEARLY, label: 'Yearly' },
]

interface IRecurringFieldsProps {
  form: UseFormReturnType<AddIncomeExpenseSchema>
}

export function RecurringFields({ form }: IRecurringFieldsProps) {
  return (
    <>
      <Select
        label="Frequency"
        placeholder="Select frequency"
        data={FrequencyOptions}
        {...form.getInputProps('frequency')}
      />
      <DateInput
        label="Start date"
        placeholder="Select date"
        {...form.getInputProps('date')}
        withAsterisk
      />
      <DateInput
        label={
          <Flex justify="space-between" align="center" gap={4}>
            <Text>End date</Text>
            <Tooltip label="Leave empty for no end date">
              <IconInfoHexagon size={16} />
            </Tooltip>
          </Flex>
        }
        placeholder="Select end date"
        {...form.getInputProps('endDate')}
      />
    </>
  )
}
