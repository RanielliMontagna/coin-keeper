import { useNavigate } from 'react-router-dom'

import { EmptyState } from '@quantun/core'
import { Button, Skeleton, Stack, Title } from '@mantine/core'
import { rem } from '@quantun/utils'

import { ResponseTransaction } from 'api/transactions/transactions.types'
import { Transaction } from './transaction/transaction'
import SectionPaper from '../sectionPaper/sectionPaper'
import { useTransactions } from './useTransactions'

import EmptyImage from 'assets/transactions/empty-image.svg'

export function Transactions() {
  const { transactions, isLoading } = useTransactions()

  const _navigate = useNavigate()

  if (!transactions?.length && !isLoading) {
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
          <EmptyState.Title>No transactions</EmptyState.Title>
          <EmptyState.Text>
            You don&apos;t have any transactions yet.
            <br />
            Create one to start tracking your money.
          </EmptyState.Text>
        </EmptyState>
      </SectionPaper>
    )
  }

  return (
    <SectionPaper flexProps={{ gap: rem(16) }}>
      <Title order={5}>Latest transactions</Title>
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
