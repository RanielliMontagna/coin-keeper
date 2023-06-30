import { Stack, Title } from '@mantine/core'
import SectionPaper from '../sectionPaper/sectionPaper'
import { Account } from './account/account'

export function Accounts() {
  return (
    <SectionPaper flexProps={{ gap: 16 }}>
      <Title order={4}>Accounts</Title>
      <Stack style={{ gap: 4 }}>
        <Account name="Wallet" balance={1000} />
        <Account name="Nubank" balance={5000} />
        <Account name="XP" balance={10000} />
      </Stack>
    </SectionPaper>
  )
}
