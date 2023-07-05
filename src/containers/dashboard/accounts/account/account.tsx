import { Flex, Title, Text, Image } from '@mantine/core'

import { ResponseAccount } from 'api/accounts/accounts.types'
import { institutionLogoMap } from 'containers/accounts/accounts.static'
import { currencyFormat } from 'utils/currencyFormat'

interface IAccountProps extends ResponseAccount {}

export function Account({ name, institution, balance }: IAccountProps) {
  return (
    <Flex justify="space-between">
      <Flex align="center" gap={4}>
        <Image src={institutionLogoMap[institution]} width={18} height={18} />
        <Text size="md">{name}</Text>
      </Flex>
      <Title order={6}>{currencyFormat(balance)}</Title>
    </Flex>
  )
}
