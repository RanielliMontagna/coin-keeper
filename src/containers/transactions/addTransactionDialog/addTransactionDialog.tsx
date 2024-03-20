import dayjs from 'dayjs'

import { useForm, zodResolver } from '@mantine/form'
import { Button, Checkbox, Group, Stack, Switch, TextInput } from '@mantine/core'

import { Modal } from 'components/modal'
import { CurrencyInput } from 'components/currencyInput/currencyInput'
import { DateInput } from 'components/dateInput/dateInput'

import {
  AddTransactionSchema,
  addTransactionSchemaCredit,
  addTransactionSchemaIncomeOrExpense,
} from './addTransactionDialog.schema'
import { useAddTransactionDialog } from './useAddTransactionDialog'
import { AddTransactionTypeEnum } from 'contexts/transactions/transactions.context.types'
import { SelectCategory } from './selectCategory/selectCategory'
import { SelectAccount } from './selectAccount/selectAccount'
import { RecurringFields } from './recurringFields/recurringFields'
import { FrequencyEnum } from 'api/recurringTransactions/recurringTransactions.types'
import { useMemo } from 'react'
import { SelectCreditCard } from './selectCreditCard/selectCreditCard'

export interface IAddTransactionDialogProps {
  type: AddTransactionTypeEnum
  defaultDate?: Date
  onClose: () => void
}

export function AddTransactionDialog(props: IAddTransactionDialogProps) {
  const { accounts, categories, creditCards, handleSubmit } = useAddTransactionDialog(props)

  const form = useForm<AddTransactionSchema>({
    initialValues: {
      title: '',
      description: '',
      amount: 0,
      category: '',
      account: '',
      creditCard: '',
      date: props.defaultDate || dayjs().toDate(),
      isRecurring: false,
      frequency: String(FrequencyEnum.MONTHLY),
      repetition: 2,
      isPaid: true,
    },
    validate: zodResolver(
      props.type === AddTransactionTypeEnum.CREDIT
        ? addTransactionSchemaCredit
        : addTransactionSchemaIncomeOrExpense,
    ),
  })

  const title = useMemo(() => {
    switch (props.type) {
      case AddTransactionTypeEnum.INCOME:
        return 'Add new income'
      case AddTransactionTypeEnum.EXPENSE:
        return 'Add new expense'
      case AddTransactionTypeEnum.CREDIT:
        return 'Add new credit expense'
    }
  }, [props.type])

  const submitLabel = useMemo(() => {
    switch (props.type) {
      case AddTransactionTypeEnum.INCOME:
        return 'Add income'
      case AddTransactionTypeEnum.EXPENSE:
        return 'Add expense'
      case AddTransactionTypeEnum.CREDIT:
        return 'Add credit expense'
    }
  }, [props.type])

  return (
    <Modal title={title} onClose={props.onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <Stack spacing={8}>
            <TextInput
              data-autofocus
              label="Title"
              placeholder="Enter expense title"
              withAsterisk
              {...form.getInputProps('title')}
            />
            <TextInput
              label="Description"
              placeholder="Enter expense description"
              {...form.getInputProps('description')}
            />
            <CurrencyInput
              label="Amount"
              placeholder="Enter expense amount"
              withAsterisk
              {...form.getInputProps('amount')}
            />
            {props.type != AddTransactionTypeEnum.CREDIT && (
              <Checkbox label="Paid" defaultChecked {...form.getInputProps('isPaid')} />
            )}
            <SelectCategory form={form} categories={categories} />
            {props.type != AddTransactionTypeEnum.CREDIT ? (
              <SelectAccount form={form} accounts={accounts} />
            ) : (
              <SelectCreditCard form={form} creditCards={creditCards} />
            )}
            {!form.values.isRecurring && (
              <DateInput
                label="Date"
                placeholder="Select date"
                {...form.getInputProps('date')}
                withAsterisk
                minDate={dayjs().toDate()}
              />
            )}
            <Switch label="Recurring" {...form.getInputProps('isRecurring')} />
            {form.values.isRecurring && <RecurringFields form={form} type={props.type} />}
          </Stack>
          <Group position="right">
            <Button type="button" variant="default" color="gray" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
