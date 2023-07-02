import { Button } from '@mantine/core'
import { EmptyState, Header } from '@quantun/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'

import { Datatable } from 'components/datatable'

import { PrivateContainer } from 'components/privateContainer'
import { useTransactions } from './useTransactions'
import { currencyFormat } from 'utils/currencyFormat'
import { AddIncomeExpenseDialog } from './addIncomeExpenseDialog/addIncomeExpenseDialog'

export default function Transactions() {
  const {
    transactions,
    isLoading,
    addIncomeExpense,
    handleAddExpense,
    handleAddIncome,
    handleCloseAddIncomeExpense,
  } = useTransactions()

  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Transactions</Header.Title>
        <Header.Subtitle>Pay your bills, transfer money and more</Header.Subtitle>
        <Header.RightSection>
          <Button leftIcon={<IconPlus size={16} />} onClick={handleAddExpense}>
            Add Expense
          </Button>
          <Button leftIcon={<IconPlus size={16} />} onClick={handleAddIncome}>
            Add Income
          </Button>
        </Header.RightSection>
      </Header>
      <Datatable
        columns={[
          {
            accessor: 'title',
            title: 'Title',
          },
          {
            accessor: 'description',
            title: 'Description',
          },
          {
            accessor: 'amount',
            title: 'Amount',
            render: ({ amount }: { amount: number }) => currencyFormat(amount),
          },
          {
            accessor: 'type',
            title: 'Type',
          },
          {
            accessor: 'date',
            title: 'Date',
          },
          {
            accessor: 'category',
            title: 'Category',
          },
          {
            accessor: 'account',
            title: 'Account',
          },
        ]}
        actions={[
          {
            icon: <IconTrash size={16} />,
            label: 'Delete',
            onClick: () => {},
            // onClick: openDeleteModal,
          },
        ]}
        records={transactions}
        fetching={isLoading}
        emptyState={
          <EmptyState>
            {/* TODO: implementar images empty */}
            <EmptyState.Title>No transactions found</EmptyState.Title>
            <EmptyState.Text>Create your first transaction to get started</EmptyState.Text>
          </EmptyState>
        }
      />
      {addIncomeExpense.opened && addIncomeExpense.type != null && (
        <AddIncomeExpenseDialog
          type={addIncomeExpense.type}
          onClose={handleCloseAddIncomeExpense}
        />
      )}
    </PrivateContainer>
  )
}
