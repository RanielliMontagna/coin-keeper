import { useMantineTheme } from '@mantine/core'
import { DataTable as MantineDataTable, DataTableProps } from 'mantine-datatable'

type IDataTableProps<T> = DataTableProps<T>

export function Datatable<T extends Record<string, unknown>>({
  columns,
  ...rest
}: IDataTableProps<T>) {
  const { colorScheme, colors, white } = useMantineTheme()

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

  return (
    // @ts-expect-error - MantineDataTable ignore types error for now
    <MantineDataTable
      striped
      columns={newColumns}
      borderRadius={8}
      style={{
        backgroundColor: colorScheme === 'dark' ? colors.dark[8] : white,
      }}
      {...rest}
    />
  )
}
