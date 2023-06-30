import dayjs from 'dayjs'

import { Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { TransactionType } from 'api/transactions/transactions.types'
import { currencyFormat } from 'utils/currencyFormat'

interface ITransactionProps {
  title: string
  category: string
  amount: number
  type: TransactionType
  date: string
}

export function Transaction({ title, category, amount, date, type }: ITransactionProps) {
  const { colors } = useMantineTheme()

  return (
    <Flex justify="space-between">
      <Flex direction="column">
        <Title order={5}>{title}</Title>
        <Text color="gray.6" size="sm">
          {category}
        </Text>
      </Flex>
      <Flex direction="column" align="flex-end">
        <Title
          order={5}
          style={{
            color: type === TransactionType.INCOME ? colors.green[7] : undefined,
          }}
        >
          {type === TransactionType.INCOME ? '+' : '-'}
          {currencyFormat(amount)}
        </Title>
        <Text color="gray.6" size="xs">
          {dayjs(date).format('DD/MM/YYYY HH:mm')}
        </Text>
      </Flex>
    </Flex>
  )
}
