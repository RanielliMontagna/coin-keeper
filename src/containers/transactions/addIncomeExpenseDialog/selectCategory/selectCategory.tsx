import { forwardRef } from 'react'

import { Flex, Select, SelectItemProps } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconInnerShadowLeftFilled } from '@tabler/icons-react'

import { categoryColors } from 'containers/categories/categories.static'
import { CategoryColorsEnum } from 'api/categories/categories.types'
import { AddIncomeExpenseSchema } from '../addIncomeExpenseDialog.schema'

interface ISelectCategoryProps {
  form: UseFormReturnType<AddIncomeExpenseSchema>
  categories: { value: string; label: string; color?: CategoryColorsEnum }[]
}

export function SelectCategory({ form, categories }: ISelectCategoryProps) {
  const selectedCategory = categories.find((category) => category.value === form.values.category)

  return (
    <Select
      label="Category"
      placeholder="Select category"
      data={categories}
      withAsterisk
      icon={
        selectedCategory && (
          <IconInnerShadowLeftFilled
            style={{
              marginLeft: 2,
              color: categoryColors[selectedCategory.color as CategoryColorsEnum],
            }}
          />
        )
      }
      itemComponent={forwardRef(function SelectItem(
        { label, ...rest }: SelectItemProps,
        ref: React.Ref<HTMLDivElement>,
      ) {
        const color = Number(rest.color) as CategoryColorsEnum

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
      {...form.getInputProps('category')}
    />
  )
}
