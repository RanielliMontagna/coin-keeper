import { z } from 'zod'

import type { ResponseAccount } from 'api/accounts/accounts.types'

import { useForm, zodResolver } from '@mantine/form'

import { Modal } from 'components/modal'
import { Button, Group, Stack, TextInput } from '@mantine/core'
import { CurrencyInput } from 'components/currencyInput/currencyInput'

interface IAddEditAccountDialogProps extends Partial<ResponseAccount> {
  onClose: () => void
}

const newAccountSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  balance: z.number().positive({ message: 'Balance must be positive' }),
})

export function AddEditAccountDialog({ onClose, id, name, balance }: IAddEditAccountDialogProps) {
  const form = useForm({
    initialValues: { name: name || '', balance: balance || 0 },
    validate: zodResolver(newAccountSchema),
  })

  return (
    <Modal title={id ? `Edit account ${name}` : 'Add new account'} onClose={onClose}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack spacing="md">
          <TextInput
            label="Name"
            placeholder="Enter your name"
            withAsterisk
            {...form.getInputProps('name')}
          />
          <CurrencyInput
            label="Balance"
            placeholder="Enter your balance"
            withAsterisk
            {...form.getInputProps('balance')}
          />
          <Group position="right">
            <Button type="button" variant="default" color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{id ? 'Edit' : 'Add'} account</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
