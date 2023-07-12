import { Stack, Flex, Divider, Menu } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'

import { useList } from '../list.context'
import { IListRowProps } from '../list.types'

export function ListRow({ children, actions }: IListRowProps) {
  const { data } = useList()
  const dataLength = data?.length || 0

  return (
    <Stack>
      {data?.map((row, index) => {
        return (
          <>
            <Flex justify="space-between" align="center">
              {children(row, index)}
              {actions && (
                <Menu>
                  <Menu.Target>
                    <IconDots size={24} style={{ cursor: 'pointer' }} />
                  </Menu.Target>
                  <Menu.Dropdown>
                    {actions?.map((action) => (
                      <Menu.Item
                        key={action.label}
                        onClick={() => action.onClick(row)}
                        icon={action.icon}
                      >
                        {action.label}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              )}
            </Flex>
            {index !== dataLength - 1 && <Divider />}
          </>
        )
      })}
    </Stack>
  )
}
