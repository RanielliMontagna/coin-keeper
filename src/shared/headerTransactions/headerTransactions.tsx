import { Header } from '@quantun/core'
import dayjs from 'dayjs'

import { HeaderButtons } from 'components/headerButtons'
import { useTransactionsContext } from 'contexts/transactions/transactions.context'
import { IconCreditCardPay, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'
import { useMantineTheme } from '@mantine/core'

interface IHeaderTransactionsProps {
  selectedMonth?: Date
}

export function HeaderTransactions({ selectedMonth }: IHeaderTransactionsProps) {
  const { handleAddExpense, handleAddIncome } = useTransactionsContext()
  const { colors } = useMantineTheme()

  return (
    <Header.RightSection>
      <HeaderButtons.Root>
        <HeaderButtons.Button
          label="Add Credit Expense"
          color="blue"
          highlightColor={colors.blue[6]}
          icon={IconCreditCardPay}
          onClick={() => {}}
        />
        <HeaderButtons.Button
          label="Add Expense"
          color="red"
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
