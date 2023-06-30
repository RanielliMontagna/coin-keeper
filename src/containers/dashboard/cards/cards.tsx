import { Group } from '@mantine/core'

import { Card, CardTypeEnum } from './card/card'

export function Cards() {
  return (
    <Group>
      <Card type={CardTypeEnum.BALANCE} amount={1350} percentage={0.1} />
      <Card type={CardTypeEnum.INCOMES} amount={1500} percentage={0.1} />
      <Card type={CardTypeEnum.EXPENSES} amount={150} percentage={0.1} />
    </Group>
  )
}
