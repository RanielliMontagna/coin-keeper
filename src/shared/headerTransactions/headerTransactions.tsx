import { useTheme } from '@emotion/react'
import { Header } from '@quantun/core'
import dayjs from 'dayjs'

import { HeaderButtons } from 'components/headerButtons'
import { useTransactionsContext } from 'contexts/transactions/transactions.context'
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

interface IHeaderTransactionsProps {
  selectedMonth?: Date
}

export function HeaderTransactions({ selectedMonth }: IHeaderTransactionsProps) {
  const { colors } = useTheme()
  const { handleAddExpense, handleAddIncome } = useTransactionsContext()

  return (
    <Header.RightSection>
      <HeaderButtons.Root>
        <HeaderButtons.Button
          label="Add Expense"
          highlightColor={colors.red[6]}
          icon={IconTrendingDown}
          onClick={() => {
            handleAddExpense(
              dayjs(selectedMonth).month() === dayjs().month()
                ? dayjs().toDate()
                : dayjs(selectedMonth).toDate(),
            )
          }}
        />
        <HeaderButtons.Button label="Add Income" onClick={handleAddIncome} icon={IconTrendingUp} />
      </HeaderButtons.Root>
    </Header.RightSection>
  )
}
