import { Flex, NumberInput, Select } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { DateInput } from 'components/dateInput/dateInput'

import { AddTransactionSchema } from '../addTransactionDialog.schema'
import { FrequencyEnum } from 'api/recurringTransactions/recurringTransactions.types'
import { AddTransactionTypeEnum } from 'contexts/transactions/transactions.context.types'

export const FrequencyOptions = [
  { value: FrequencyEnum.WEEKLY.toString(), label: 'Weekly' },
  { value: FrequencyEnum.MONTHLY.toString(), label: 'Monthly' },
  { value: FrequencyEnum.YEARLY.toString(), label: 'Yearly' },
]

interface IRecurringFieldsProps {
  form: UseFormReturnType<AddTransactionSchema>
  type: AddTransactionTypeEnum
}

export function RecurringFields({ form, type }: IRecurringFieldsProps) {
  return (
    <>
      <Flex gap={8}>
        <NumberInput
          label="Repetition"
          placeholder="Enter number of repetitions"
          min={1}
          max={99}
          maw={80}
          {...form.getInputProps('repetition')}
        />
        <Select
          label="Frequency"
          placeholder="Select frequency"
          data={FrequencyOptions}
          w="100%"
          disabled={type === AddTransactionTypeEnum.CREDIT}
          {...form.getInputProps('frequency')}
        />
      </Flex>
      <DateInput
        label="Start date"
        placeholder="Select date"
        {...form.getInputProps('date')}
        withAsterisk
      />
    </>
  )
}
