import { useForm, zodResolver } from '@mantine/form'
import { Button, Group, Stack, TextInput } from '@mantine/core'

import { Modal } from 'components/modal'
import { CurrencyInput } from 'components/currencyInput/currencyInput'
import type { ResponseAccount } from 'api/accounts/accounts.types'

import { addEditAccountSchema } from './addEditAccountDialog.schema'
import { useAddEditAccountDialog } from './useAddEditAccountDialog'

export interface IAddEditAccountDialogProps extends Partial<ResponseAccount> {
  onClose: () => void
}

export function AddEditAccountDialog(props: IAddEditAccountDialogProps) {
  const { handleSubmit } = useAddEditAccountDialog(props)

  const form = useForm({
    initialValues: { name: props.name || '', balance: props.balance || 0 },
    validate: zodResolver(addEditAccountSchema),
  })

  return (
    <Modal
      title={props.id ? `Edit account ${props.name}` : 'Add new account'}
      onClose={props.onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <TextInput
            data-autofocus
            label="Name"
            placeholder="Enter account name"
            withAsterisk
            {...form.getInputProps('name')}
          />
          <CurrencyInput
            label="Balance"
            placeholder="Enter account balance"
            withAsterisk
            {...form.getInputProps('balance')}
          />
          <Group position="right">
            <Button type="button" variant="default" color="gray" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit">{props.id ? 'Edit' : 'Add'} account</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
