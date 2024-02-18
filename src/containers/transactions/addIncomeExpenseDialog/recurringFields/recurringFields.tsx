import { NumberInput, Select } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

import { DateInput } from 'components/dateInput/dateInput'

import { AddIncomeExpenseSchema } from '../addIncomeExpenseDialog.schema'

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
      <NumberInput
        label="Repetition"
        placeholder="Enter number of repetitions"
        min={1}
        max={99}
        {...form.getInputProps('repetition')}
      />
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
    </>
  )
}
