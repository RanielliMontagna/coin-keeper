import { useCallback, useMemo } from 'react'
import { Box, Button, Checkbox, Flex, Text, Title } from '@mantine/core'
import { Form, useForm, zodResolver } from '@mantine/form'

import { ConfigBox } from '../styles'
import { useIsMobile } from 'hooks/useIsMobile'
import { ConfigsSchema, configsSchema } from '../configs.schema'
import type { Config } from 'api/configs/config.types'

interface ConfigFormProps {
  configs: Config[]
  isLoading: boolean
  onSubmit: (values: ConfigsSchema) => void
}

export function ConfigForm({ configs, isLoading, onSubmit }: ConfigFormProps) {
  const { isMobile } = useIsMobile()

  const initialValues = useMemo(
    () => ({
      auto_mark_as_paid: configs.find((c) => c.key === 'auto_mark_as_paid')?.value === 'true',
    }),
    [configs],
  )

  const form = useForm<ConfigsSchema>({ initialValues, validate: zodResolver(configsSchema) })

  const isDirty = useMemo(() => {
    return initialValues.auto_mark_as_paid !== form.values.auto_mark_as_paid
  }, [form.values.auto_mark_as_paid, configs])

  const handleReset = useCallback(() => {
    form.setValues(initialValues)
  }, [form])

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'space-between' : 'flex-start',
        gap: 16,
        height: '100%',
      }}
    >
      <Flex>
        <ConfigBox
          enabled={Boolean(form.values.auto_mark_as_paid)}
          onClick={() => form.setFieldValue('auto_mark_as_paid', !form.values.auto_mark_as_paid)}
        >
          <Flex direction="column">
            <Title order={4}>Auto mark as paid</Title>
            <Text>
              When enabled, the system will automatically mark recurring transactions as paid on the
              payment day.
            </Text>
          </Flex>
          <Box>
            <Checkbox
              label="Enable"
              name="auto_mark_as_paid"
              checked={form.values.auto_mark_as_paid}
              onChange={(event) => {
                form.setFieldValue('auto_mark_as_paid', event.currentTarget.checked)
              }}
            />
          </Box>
        </ConfigBox>
      </Flex>
      <Flex direction={isMobile ? 'column-reverse' : 'row'} gap="sm">
        {isDirty && (
          <Button variant="default" color="gray" onClick={handleReset}>
            Undo changes
          </Button>
        )}
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          Save
        </Button>
      </Flex>
    </Form>
  )
}
