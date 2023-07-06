import { forwardRef } from 'react'
import { useForm, zodResolver } from '@mantine/form'
import { Button, Group, Stack, TextInput, Select, Flex, SelectItemProps } from '@mantine/core'

import { IconInnerShadowLeftFilled } from '@tabler/icons-react'

import { Modal } from 'components/modal'
import { capitalizeAllAndRemoveUnderscore } from 'utils/capitalize'
import { CategoryColorsEnum, type ResponseCategory } from 'api/categories/categories.types'

import { addEditCategorySchema } from './addEditCategoryDialog.schema'
import { useAddEditCategoryDialog } from './useAddEditCategoryDialog'
import { categoryColors } from '../categories.static'

export interface IAddEditCategoryDialogProps extends Partial<ResponseCategory> {
  onClose: () => void
}

export function AddEditCategoryDialog(props: IAddEditCategoryDialogProps) {
  const { handleSubmit } = useAddEditCategoryDialog(props)

  const form = useForm({
    initialValues: {
      name: props.name || '',
      description: props.description || '',
      color: props.color ? props.color : undefined,
    },
    validate: zodResolver(addEditCategorySchema),
  })

  return (
    <Modal
      title={props.id ? `Edit category ${props.name}` : 'Add new category'}
      onClose={props.onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit as () => void)}>
        <Stack spacing="md">
          <Stack spacing={8}>
            <TextInput
              data-autofocus
              label="Name"
              placeholder="Enter category name"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Description"
              placeholder="Enter category description"
              {...form.getInputProps('description')}
            />
            <Select
              label="Color"
              placeholder="Select category color"
              styles={{ itemsWrapper: { height: '150px' } }}
              icon={
                form.values.color && (
                  <IconInnerShadowLeftFilled
                    style={{
                      marginLeft: 4,
                      color: categoryColors[form.values.color as CategoryColorsEnum],
                    }}
                  />
                )
              }
              withAsterisk
              itemComponent={forwardRef(function SelectItem(
                { value, label, ...rest }: SelectItemProps,
                ref: React.Ref<HTMLDivElement>,
              ) {
                const color = value as CategoryColorsEnum

                return (
                  <Flex
                    ref={ref}
                    gap={8}
                    {...rest}
                    sx={{
                      '&[data-selected]': {
                        backgroundColor: categoryColors[color],
                        color: 'white',
                      },
                      '&[data-hovered]': {
                        backgroundColor: categoryColors[color],
                        color: 'white',
                      },
                      color: categoryColors[color],
                    }}
                  >
                    <Flex>
                      <IconInnerShadowLeftFilled />
                    </Flex>
                    {label}
                  </Flex>
                )
              })}
              data={Object.keys(CategoryColorsEnum).map((color) => ({
                value: color,
                label: capitalizeAllAndRemoveUnderscore(color),
              }))}
              {...form.getInputProps('color')}
            />
          </Stack>
          <Group position="right">
            <Button type="button" variant="default" color="gray" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit">{props.id ? 'Edit' : 'Add'} category</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
