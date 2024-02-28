import { Group, useMantineTheme } from '@mantine/core'

import { Card } from 'components/card/card'
import { IconArrowDown, IconArrowUp, IconBuildingBank } from '@tabler/icons-react'
import { MetaTransaction } from 'api/transactions/transactions.types'

interface TransactionCardsProps {
  meta: MetaTransaction
  isLoading?: boolean
}

export function TransactionCards({ meta, isLoading = false }: TransactionCardsProps) {
  const { colors } = useMantineTheme()

  return (
    <Group>
      <Card
        title="Monthly Balance"
        icon={<IconBuildingBank size={24} color={colors.indigo[6]} />}
        amount={meta.balance}
        isLoading={isLoading}
      />
      <Card
        title="Incomes"
        icon={<IconArrowUp size={24} color={colors.green[6]} />}
        amount={meta.incomes}
        isLoading={isLoading}
      />
      <Card
        title="Expenses"
        icon={<IconArrowDown size={24} color={colors.red[6]} />}
        amount={meta.expenses}
        isLoading={isLoading}
      />
    </Group>
  )
}
