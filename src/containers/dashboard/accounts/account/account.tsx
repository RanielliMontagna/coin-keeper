import { Flex, Title, Text, Image, Tooltip } from '@mantine/core'

import { ResponseAccount } from 'api/accounts/accounts.types'
import { institutionLogoMap } from 'containers/accounts/accounts.static'
import { currencyFormat } from 'utils/currencyFormat'

interface IAccountProps extends ResponseAccount {}

export function Account({ name, institution, balance }: IAccountProps) {
  return (
    <Flex justify="space-between">
      <Flex align="center" gap={4} style={{ width: 'calc(100% - 100px)' }}>
        <Image src={institutionLogoMap[institution]} width={18} height={18} />
        <Tooltip label={name} withArrow openDelay={1000}>
          <Text
            size="md"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {name}
          </Text>
        </Tooltip>
      </Flex>
      <Title order={6}>{currencyFormat(balance)}</Title>
    </Flex>
  )
}
