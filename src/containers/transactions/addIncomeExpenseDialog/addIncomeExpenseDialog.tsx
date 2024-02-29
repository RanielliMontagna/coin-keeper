import dayjs from 'dayjs'

import { useForm, zodResolver } from '@mantine/form'
import { Button, Checkbox, Group, Stack, Switch, TextInput } from '@mantine/core'

import { Modal } from 'components/modal'
import { CurrencyInput } from 'components/currencyInput/currencyInput'
import { DateInput } from 'components/dateInput/dateInput'

import { AddIncomeExpenseSchema, addIncomeExpenseSchema } from './addIncomeExpenseDialog.schema'
import { useAddIncomeExpenseDialog } from './useAddIncomeExpenseDialog'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'
import { SelectCategory } from './selectCategory/selectCategory'
import { SelectAccount } from './selectAccount/selectAccount'
import { RecurringFields } from './recurringFields/recurringFields'
import { FrequencyEnum } from 'api/recurringTransactions/recurringTransactions.types'

export interface IAddIncomeExpenseDialogProps {
  type: TransactionTypeEnum
  defaultDate?: Date
  onClose: () => void
}

export function AddIncomeExpenseDialog(props: IAddIncomeExpenseDialogProps) {
  const { accounts, categories, handleSubmit } = useAddIncomeExpenseDialog(props)

  const form = useForm<AddIncomeExpenseSchema>({
    initialValues: {
      title: '',
      description: '',
      amount: 0,
      category: '',
      account: '',
      date: props.defaultDate || dayjs().toDate(),
      isRecurring: false,
      frequency: FrequencyEnum.MONTHLY,
      repetition: 2,
      isPaid: true,
    },
    validate: zodResolver(addIncomeExpenseSchema),
  })

  return (
    <Modal
      title={`Add new ${props.type === TransactionTypeEnum.INCOME ? 'income' : 'expense'}`}
      onClose={props.onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit as () => void)}>
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
            <Checkbox label="Paid" defaultChecked {...form.getInputProps('isPaid')} />
            <SelectCategory form={form} categories={categories} />
            <SelectAccount form={form} accounts={accounts} />
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
            {form.values.isRecurring && <RecurringFields form={form} />}
          </Stack>
          <Group position="right">
            <Button type="button" variant="default" color="gray" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {props.type === TransactionTypeEnum.INCOME ? 'Add income' : 'Add expense'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
