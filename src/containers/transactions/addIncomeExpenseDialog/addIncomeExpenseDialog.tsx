import { useForm, zodResolver } from '@mantine/form'
import { Button, Group, Select, Stack, TextInput } from '@mantine/core'

import { Modal } from 'components/modal'
import { CurrencyInput } from 'components/currencyInput/currencyInput'
import { DateInput } from 'components/dateInput/dateInput'

import { addIncomeExpenseSchema } from './addIncomeExpenseDialog.schema'
import { useAddIncomeExpenseDialog } from './useAddIncomeExpenseDialog'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'

export interface IAddIncomeExpenseDialogProps {
  type: TransactionTypeEnum
  onClose: () => void
}

export function AddIncomeExpenseDialog(props: IAddIncomeExpenseDialogProps) {
  const { accounts, categories, handleSubmit } = useAddIncomeExpenseDialog(props)

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      amount: '',
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
            <Select
              label="Category"
              placeholder="Select category"
              data={categories}
              withAsterisk
              {...form.getInputProps('category')}
            />
            <Select
              label="Account"
              placeholder="Select account"
              data={accounts}
              withAsterisk
              {...form.getInputProps('account')}
            />
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
