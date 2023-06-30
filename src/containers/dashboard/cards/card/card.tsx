import { useMemo } from 'react'

import { Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { IconTrendingUp } from '@tabler/icons-react'

import SectionPaper from 'containers/dashboard/sectionPaper/sectionPaper'
import { currencyFormat } from 'utils/currencyFormat'
import { percentageFormat } from 'utils/percentageFormat'

export enum CardTypeEnum {
  BALANCE = 0,
  INCOMES = 1,
  EXPENSES = 2,
}

interface ICardProps {
  type: CardTypeEnum
  amount: number
  percentage: number
}

export function Card({ type, amount, percentage }: ICardProps) {
  const { colors } = useMantineTheme()

  const title = useMemo(() => {
    switch (type) {
      default:
      case CardTypeEnum.BALANCE:
        return 'Balance'
      case CardTypeEnum.INCOMES:
        return 'Incomes'
      case CardTypeEnum.EXPENSES:
        return 'Expenses'
    }
  }, [])

  const color = useMemo(() => {
    switch (type) {
      case CardTypeEnum.EXPENSES:
        return percentage > 0 ? colors.red[6] : colors.green[6]
      default:
        return percentage > 0 ? colors.green[6] : colors.red[6]
    }
  }, [])

  return (
    <SectionPaper style={{ flex: 1 }}>
      <div>
        <Text size="sm" color="gray.6">
          {title}
        </Text>
      </div>
      <Flex align="center" gap="xs">
        <Title order={3}>{currencyFormat(amount)}</Title>
        <Flex
          align="center"
          style={{
            color,
            gap: 4,
          }}
        >
          <IconTrendingUp size={16} />
          <Text size="sm">{percentageFormat(percentage)}</Text>
        </Flex>
      </Flex>
    </SectionPaper>
  )
}
