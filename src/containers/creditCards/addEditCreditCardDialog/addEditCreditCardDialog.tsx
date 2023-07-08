import { useForm, zodResolver } from '@mantine/form'
import { Button, Group, Select, Stack, TextInput } from '@mantine/core'

import { Modal } from 'components/modal'
import { CurrencyInput } from 'components/currencyInput/currencyInput'
import { ResponseCreditCard } from 'api/creditCards/creditCards.types'

import { useAddEditCreditCardDialog } from './useAddEditCreditCardDialog'
import { AddEditCreditCardSchema, addEditCreditCardSchema } from './addEditCreditCardDialog.schema'
import { SelectAccount } from './selectAccount/selectAccount'
import { SelectFlag } from './selectFlag/selectFlag'

export interface IAddEditCreditCardDialogProps extends Partial<ResponseCreditCard> {
  onClose: () => void
}

export function AddEditCreditCardDialog(props: IAddEditCreditCardDialogProps) {
  const { accounts, handleSubmit } = useAddEditCreditCardDialog(props)

  const form = useForm<AddEditCreditCardSchema>({
    initialValues: {
      name: props.name || '',
      limit: props.limit || 0,
      flag: props.flag || '',
      closingDay: String(props.closingDay || ''),
      dueDay: String(props.dueDay || ''),
      account: props.account?.id || '',
    },
    validate: zodResolver(addEditCreditCardSchema),
  })

  return (
    <Modal
      title={props.id ? `Edit credit card ${props.name}` : 'Add new credit card'}
      onClose={props.onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <Stack spacing={8}>
            <TextInput
              data-autofocus
              label="Name"
              placeholder="Enter credit card name"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <CurrencyInput
              label="Limit"
              placeholder="Enter credit card limit"
              withAsterisk
              {...form.getInputProps('limit')}
            />
            <SelectFlag form={form} />
            <Select
              label="Closing day"
              placeholder="Select credit card closing day"
              data={
                Array.from({ length: 31 }, (_, i) => i + 1).map((day) => ({
                  value: String(day),
                  label: String(day),
                })) || []
              }
              withAsterisk
              {...form.getInputProps('closingDay')}
            />
            <Select
              label="Due day"
              placeholder="Select credit card due day"
              data={
                Array.from({ length: 31 }, (_, i) => i + 1).map((day) => ({
                  value: String(day),
                  label: String(day),
                })) || []
              }
              withAsterisk
              {...form.getInputProps('dueDay')}
            />

            <SelectAccount form={form} accounts={accounts} />
          </Stack>
          <Group position="right">
            <Button type="button" variant="default" color="gray" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit">{props.id ? 'Edit' : 'Add'} credit card</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
