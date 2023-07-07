import { EmptyState } from '@quantun/core'
import { Group, Skeleton, Stack, Title } from '@mantine/core'
import { rem } from '@quantun/utils'

import SectionPaper from '../sectionPaper/sectionPaper'
import { Account } from './account/account'
import { useAccounts } from './useAccounts'

import EmptyImage from 'assets/accounts/empty-image.svg'

export function Accounts() {
  const { accounts, isLoading } = useAccounts()

  if (!isLoading && !accounts?.length) {
    return (
      <SectionPaper
        style={{ height: '100%', textAlign: 'center' }}
        flexProps={{ h: '100%', justify: 'center' }}
      >
        <EmptyState>
          <EmptyState.Image
            src={EmptyImage}
            maw={50}
            style={{ maxWidth: rem(150), width: '100%' }}
          />
          <EmptyState.Title>No accounts</EmptyState.Title>
          <EmptyState.Text>
            You don&apos;t have any accounts yet.
            <br />
            Create one to start tracking your money.
          </EmptyState.Text>
        </EmptyState>
      </SectionPaper>
    )
  }

  return (
    <SectionPaper flexProps={{ gap: 16 }}>
      <Group align="center" style={{ gap: 8 }}>
        <Title order={5}>Accounts</Title>
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
