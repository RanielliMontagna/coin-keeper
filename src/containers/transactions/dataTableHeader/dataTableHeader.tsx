import dayjs from 'dayjs'

import { Button, Flex, useMantineTheme } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'

import { IconChevronRight } from '@tabler/icons-react'
import { IconChevronLeft } from '@tabler/icons-react'

interface DataTableHeaderProps {
  selectedMonth: Date
  setSelectedMonth: React.Dispatch<React.SetStateAction<Date>>
}

export function DataTableHeader({ selectedMonth, setSelectedMonth }: DataTableHeaderProps) {
  const { colors } = useMantineTheme()

  return (
    <Flex justify="center" align="center">
      <Button
        p={8}
        mr={8}
        onClick={() => setSelectedMonth(dayjs(selectedMonth).subtract(1, 'month').toDate())}
        variant="light"
      >
        <IconChevronLeft size={20} style={{ cursor: 'pointer' }} />
      </Button>
      <MonthPickerInput
        maw={150}
        miw={150}
        value={selectedMonth}
        onChange={(date) => setSelectedMonth(date as Date)}
        styles={{
          input: {
            border: `1px solid ${colors.gray[5]}`,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />
      <Button
        p={8}
        ml={8}
        onClick={() => setSelectedMonth(dayjs(selectedMonth).add(1, 'month').toDate())}
        variant="light"
      >
        <IconChevronRight size={20} style={{ cursor: 'pointer' }} />
      </Button>
    </Flex>
  )
}
