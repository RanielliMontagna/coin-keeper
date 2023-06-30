import { Flex, Title, Text } from '@mantine/core'
import { currencyFormat } from 'utils/currencyFormat'

interface IAccountProps {
  name: string
  balance: number
}

export function Account({ name, balance }: IAccountProps) {
  return (
    <Flex justify="space-between">
      <Text size="md">{name}</Text>
      <Title order={6}>{currencyFormat(balance)}</Title>
    </Flex>
  )
}
