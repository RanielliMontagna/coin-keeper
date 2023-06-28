import { Button, Stack, Title, rem } from '@mantine/core'
import SectionPaper from '../sectionPaper/sectionPaper'
import { Transaction } from './transaction/transaction'
import { TransactionType } from 'api/transactions/transactions.types'

export function Transactions() {
  return (
    <SectionPaper
      flexProps={{
        gap: rem(16),
      }}
    >
      <Title order={4}>Latest transactions</Title>
      <Stack>
        <Transaction
          title="Nike shoes"
          category="Clothes"
          amount={50}
          date="2021-01-01"
          type={TransactionType.EXPENSE}
        />
        <Transaction
          title="Fuel"
          category="Car"
          amount={100}
          date="2021-01-01"
          type={TransactionType.EXPENSE}
        />
        <Transaction
          title="Salary"
          category="Work"
          amount={4500}
          date="2021-01-01"
          type={TransactionType.INCOME}
        />
        <Transaction
          title="Freelance"
          category="Work"
          amount={2000}
          date="2021-01-01"
          type={TransactionType.INCOME}
        />
        <Transaction
          title="Macbook Pro"
          category="Electronics"
          amount={5000}
          date="2021-01-01"
          type={TransactionType.EXPENSE}
        />
      </Stack>

      <Button variant="gradient">All transactions</Button>
    </SectionPaper>
  )
}
