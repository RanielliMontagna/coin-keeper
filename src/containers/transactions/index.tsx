import dayjs from 'dayjs'

import { Badge, Button, Flex } from '@mantine/core'
import { EmptyState, Header } from '@quantun/core'
import { IconInnerShadowLeftFilled, IconPlus, IconTrash } from '@tabler/icons-react'

import { Datatable } from 'components/datatable'
import { PrivateContainer } from 'components/privateContainer'
import { categoryColors } from 'containers/categories/categories.static'
import { currencyFormat } from 'utils/currencyFormat'
import { capitalize } from 'utils/capitalize'

import { useTransactions } from './useTransactions'
import { AddIncomeExpenseDialog } from './addIncomeExpenseDialog/addIncomeExpenseDialog'
import { ResponseTransaction, TransactionTypeEnum } from 'api/transactions/transactions.types'
import { useDeleteIncomeExpenseModal } from './deleteIncomeExpenseDialog/deleteIncomExpenseDialog'
import { DescriptionRowRender } from 'components/descriptionRowRender/descriptionRowRender'

export default function Transactions() {
  const {
    transactions,
    isLoading,
    addIncomeExpense,
    handleAddExpense,
    handleAddIncome,
    handleCloseAddIncomeExpense,
  } = useTransactions()
  const { openDeleteModal } = useDeleteIncomeExpenseModal()

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
            width: 350,
            render: ({ description }: ResponseTransaction) => {
              return <DescriptionRowRender description={description} />
            },
          },
          {
            accessor: 'amount',
            title: 'Amount',
            render: ({ amount }: ResponseTransaction) => currencyFormat(amount),
          },

          {
            accessor: 'date',
            title: 'Date',
            render: ({ date }: ResponseTransaction) => dayjs(date).format('DD/MM/YYYY'),
          },

          {
            accessor: 'account',
            title: 'Account',
            render: ({ account }: ResponseTransaction) => account.name,
          },
          {
            accessor: 'category',
            title: 'Category',
            render: ({ category }: ResponseTransaction) => {
              return (
                <Flex>
                  <Flex align="center" justify="center">
                    <IconInnerShadowLeftFilled
                      style={{ color: categoryColors[category.color] }}
                      size={28}
                    />
                  </Flex>
                  <Flex ml={4} align="center" justify="center">
                    {category.name}
                  </Flex>
                </Flex>
              )
            },
          },
          {
            accessor: 'type',
            title: 'Type',
            width: 100,
            render: ({ type }: ResponseTransaction) => {
              return (
                <Badge
                  w={75}
                  variant="filled"
                  style={{ textTransform: 'capitalize' }}
                  color={type === TransactionTypeEnum.INCOME ? 'green.6' : 'red.6'}
                >
                  {capitalize(type)}
                </Badge>
              )
            },
          },
        ]}
        actions={[
          {
            icon: <IconTrash size={16} />,
            label: 'Delete',
            onClick: openDeleteModal,
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
