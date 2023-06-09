import { Group } from '@mantine/core'

import { Card, CardTypeEnum } from './card/card'
import { useCards } from './useCards'

export function Cards() {
  const { balance, incomes, expenses, isLoading } = useCards()

  return (
    <Group>
      <Card
        type={CardTypeEnum.BALANCE}
        amount={balance || 0}
        percentage={0.1}
        isLoading={isLoading}
      />
      <Card
        type={CardTypeEnum.INCOMES}
        amount={incomes || 0}
        percentage={0.1}
        isLoading={isLoading}
      />
      <Card
        type={CardTypeEnum.EXPENSES}
        amount={expenses || 0}
        percentage={0.1}
        isLoading={isLoading}
      />
    </Group>
  )
}
