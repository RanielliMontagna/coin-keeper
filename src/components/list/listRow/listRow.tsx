import { Stack, Flex, Divider, Menu } from '@mantine/core'
import { IconDots } from '@tabler/icons-react'

import { useList } from '../list.context'
import { IListRowProps } from '../list.types'

export function ListRow({ children, actions }: IListRowProps) {
  const { data } = useList()

  return (
    <Stack>
      {data?.map((row, index) => {
        return (
          <>
            <Flex justify="space-between" align="center" gap={4}>
              {children(row, index)}
              {actions && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                          disabled={action.visible && !action.visible(row)}
                        >
                          {action.label}
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                </div>
              )}
            </Flex>
            <Divider />
          </>
        )
      })}
    </Stack>
  )
}
