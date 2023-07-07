import { useForm, zodResolver } from '@mantine/form'
import { Button, Group, Stack, TextInput } from '@mantine/core'

import { Modal } from 'components/modal'
import { CurrencyInput } from 'components/currencyInput/currencyInput'
import { DateInput } from 'components/dateInput/dateInput'

import { AddIncomeExpenseSchema, addIncomeExpenseSchema } from './addIncomeExpenseDialog.schema'
import { useAddIncomeExpenseDialog } from './useAddIncomeExpenseDialog'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'
import { SelectCategory } from './selectCategory/selectCategory'
import { SelectAccounts } from './selectAccounts/selectAccounts'

export interface IAddIncomeExpenseDialogProps {
  type: TransactionTypeEnum
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
      date: new Date(),
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
            <SelectCategory form={form} categories={categories} />
            <SelectAccounts form={form} accounts={accounts} />
            <DateInput label="Date" placeholder="Select date" {...form.getInputProps('date')} />
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
