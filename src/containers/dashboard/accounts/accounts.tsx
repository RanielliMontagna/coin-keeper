import { Group, Skeleton, Stack, Title } from '@mantine/core'

import SectionPaper from '../sectionPaper/sectionPaper'
import { Account } from './account/account'
import { useAccounts } from './useAccounts'

export function Accounts() {
  const { accounts, isLoading } = useAccounts()

  return (
    <SectionPaper flexProps={{ gap: 16 }}>
      <Group align="center" style={{ gap: 8 }}>
        <Title order={4}>Accounts</Title>
      </Group>
      <Stack style={{ gap: 4 }}>
        {isLoading ? (
          <Stack style={{ gap: 8 }}>
            <Skeleton height={23} />
            <Skeleton height={23} />
            <Skeleton height={23} />
          </Stack>
        ) : (
          accounts?.map((account) => <Account key={account.id} {...account} />)
        )}
      </Stack>
    </SectionPaper>
  )
}
