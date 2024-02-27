import { Group, useMantineTheme } from '@mantine/core'

import { Card } from 'components/card/card'
import { IconArrowDown, IconArrowUp, IconBuildingBank } from '@tabler/icons-react'

export function TransactionCards() {
  const { colors } = useMantineTheme()

  return (
    <Group>
      <Card
        title="Monthly Balance"
        icon={<IconBuildingBank size={24} color={colors.indigo[6]} />}
        amount={0}
        isLoading={false}
      />
      <Card
        title="Incomes"
        icon={<IconArrowUp size={24} color={colors.green[6]} />}
        amount={0}
        isLoading={false}
      />
      <Card
        title="Expenses"
        icon={<IconArrowDown size={24} color={colors.red[6]} />}
        amount={0}
        isLoading={false}
      />
    </Group>
  )
}
