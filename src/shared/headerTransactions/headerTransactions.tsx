import dayjs from 'dayjs'

import { Header } from '@quantun/core'

import { HeaderButtons } from 'components/headerButtons'
import { useTransactionsContext } from 'contexts/transactions/transactions.context'

interface IHeaderTransactionsProps {
  selectedMonth?: Date
}

export function HeaderTransactions({ selectedMonth }: IHeaderTransactionsProps) {
  const { handleAddExpense, handleAddIncome } = useTransactionsContext()

  return (
    <Header.RightSection>
      <HeaderButtons.Root>
        <HeaderButtons.Button
          label="Add Expense"
          onClick={() => {
            handleAddExpense(
              dayjs(selectedMonth).month() === dayjs().month()
                ? dayjs().toDate()
                : dayjs(selectedMonth).toDate(),
            )
          }}
        />
        <HeaderButtons.Button label="Add Income" onClick={handleAddIncome} />
      </HeaderButtons.Root>
    </Header.RightSection>
  )
}
