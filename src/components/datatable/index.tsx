import { Flex, Menu, createStyles, useMantineTheme } from '@mantine/core'
import { DataTable as MantineDataTable, DataTableProps, DataTableColumn } from 'mantine-datatable'
import { IActionProps } from './actions/actions'

import { IconDotsVertical } from '@tabler/icons-react'

type IDataTableProps<T> = DataTableProps<T> & {
  actions?: IActionProps[]
}

const useStyles = createStyles((theme) => ({
  table: {
    borderRadius: theme.radius.md,
    '& thead tr th': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
    },
  },
}))

export function Datatable<T extends Record<string, unknown>>({
  columns,
  actions,
  ...rest
}: IDataTableProps<T>) {
  const { colorScheme, colors, white } = useMantineTheme()
  const { classes } = useStyles()

  const newColumns = columns?.map((column) => {
    return {
      ...column,
      cellsStyle: {
        ...column.cellsStyle,
        paddingTop: 16,
        paddingBottom: 16,
      },
    }
  })

  const columnsWithActions = [
    ...(newColumns ?? []),
    {
      accessor: 'actions',
      title: 'Actions',
      textAlignment: 'right',
      width: 80,
      render: (row) => {
        return (
          <Flex justify="center">
            <Menu>
              <Menu.Target>
                <IconDotsVertical size={18} style={{ cursor: 'pointer' }} />
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
          </Flex>
        )
      },
    },
  ] as DataTableColumn<T>[]

  return (
    // @ts-expect-error - MantineDataTable ignore types error for now
    <MantineDataTable
      striped
      {...rest}
      className={`${classes.table} ${rest.className}`}
      columns={actions ? columnsWithActions : newColumns}
      style={{
        backgroundColor: colorScheme === 'dark' ? colors.dark[8] : white,
        ...rest.style,
      }}
    />
  )
}
