import { Group, useMantineTheme } from '@mantine/core'
import { IconArrowDown, IconArrowUp, IconBuildingBank, IconCreditCard } from '@tabler/icons-react'

import { Card } from 'components/card/card'

import { useCards } from './useCards'

export function Cards() {
  const { balance, incomes, expenses, isLoading } = useCards()
  const { colors } = useMantineTheme()

  return (
    <Group>
      <Card
        title="General Balance"
        icon={<IconBuildingBank size={24} color={colors.indigo[6]} />}
        amount={balance || 0}
        isLoading={isLoading}
      />
      <Card
        title="Incomes"
        icon={<IconArrowUp size={24} color={colors.green[6]} />}
        amount={incomes || 0}
        isLoading={isLoading}
      />
      <Card
        title="Expenses"
        icon={<IconArrowDown size={24} color={colors.red[6]} />}
        amount={expenses || 0}
        isLoading={isLoading}
      />
      <Card
        title="Credit cards"
        icon={<IconCreditCard size={24} color={colors.blue[6]} />}
        amount={0}
        isLoading={isLoading}
      />
    </Group>
  )
}
