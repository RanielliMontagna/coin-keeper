import { useMemo } from 'react'

import { Avatar, Flex, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'

import SectionPaper from 'containers/dashboard/sectionPaper/sectionPaper'
import { currencyFormat } from 'utils/currencyFormat'

import { IconArrowDown, IconArrowUp, IconBuildingBank, IconCreditCard } from '@tabler/icons-react'

export enum CardTypeEnum {
  BALANCE = 0,
  INCOMES = 1,
  EXPENSES = 2,
  CREDIT = 3,
}

interface ICardProps {
  type: CardTypeEnum
  amount: number

  isLoading?: boolean
}

export function Card({ type, amount, isLoading = false }: ICardProps) {
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
      case CardTypeEnum.CREDIT:
        return 'Credit cards'
    }
  }, [])

  const icon = useMemo(() => {
    const wrapper = (children: React.ReactNode) => (
      <Avatar size={40} style={{ marginRight: 10 }}>
        {children}
      </Avatar>
    )

    switch (type) {
      default:
      case CardTypeEnum.BALANCE:
        return wrapper(<IconBuildingBank size={24} color={colors.indigo[6]} />)
      case CardTypeEnum.INCOMES:
        return wrapper(<IconArrowUp size={24} color={colors.green[6]} />)
      case CardTypeEnum.EXPENSES:
        return wrapper(<IconArrowDown size={24} color={colors.red[6]} />)
      case CardTypeEnum.CREDIT:
        return wrapper(<IconCreditCard size={24} color={colors.blue[6]} />)
    }
  }, [colors, type])

  return (
    <SectionPaper style={{ flex: 1 }}>
      <Flex justify="space-between" align="center" gap={4}>
        <Flex direction="column">
          <Text size="sm" color="gray.6">
            {title}
          </Text>
          {isLoading ? (
            <Skeleton style={{ marginTop: 6, height: 25 }} />
          ) : (
            <Flex>
              <Title order={3}>{currencyFormat(amount || 0)}</Title>
            </Flex>
          )}
        </Flex>
        {icon}
      </Flex>
    </SectionPaper>
  )
}
