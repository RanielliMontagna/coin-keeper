import { useNavigate } from 'react-router-dom'

import { Button, Skeleton, Stack, Title, rem } from '@mantine/core'

import { ResponseTransaction } from 'api/transactions/transactions.types'
import { Transaction } from './transaction/transaction'
import SectionPaper from '../sectionPaper/sectionPaper'
import { useTransactions } from './useTransactions'

export function Transactions() {
  const { transactions, isLoading } = useTransactions()

  const _navigate = useNavigate()

  return (
    <SectionPaper flexProps={{ gap: rem(16) }}>
      <Title order={4}>Latest transactions</Title>
      <Stack>
        {isLoading ? (
          <>
            {new Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} height={rem(45.8)} />
            ))}
          </>
        ) : (
          transactions?.map((transaction: ResponseTransaction) => (
            <Transaction
              key={transaction.id}
              amount={transaction.amount}
              category={transaction.category.name}
              date={transaction.date}
              title={transaction.title}
              type={transaction.type}
            />
          ))
        )}
      </Stack>

      <Button variant="gradient" onClick={() => _navigate('/transactions')}>
        All transactions
      </Button>
    </SectionPaper>
  )
}
