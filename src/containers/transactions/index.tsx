import dayjs from 'dayjs'

import { Badge, Flex, Image, Stack, Text, Title, Tooltip } from '@mantine/core'
import { EmptyState, Header } from '@quantun/core'
import {
  IconCheck,
  IconChecks,
  IconExclamationMark,
  IconInnerShadowLeftFilled,
  IconTrash,
} from '@tabler/icons-react'

import { Datatable } from 'components/datatable'
import { PrivateContainer } from 'components/privateContainer'
import { categoryColors } from 'containers/categories/categories.static'
import { currencyFormat } from 'utils/currencyFormat'
import { capitalizeAllAndRemoveUnderscore } from 'utils/capitalize'

import { useTransactions } from './useTransactions'
import { ResponseTransaction, TransactionTypeEnum } from 'api/transactions/transactions.types'
import { useDeleteIncomeExpenseModal } from './deleteIncomeExpenseDialog/deleteIncomeExpenseDialog'
import { DescriptionRowRender } from 'components/descriptionRowRender/descriptionRowRender'

import EmptyImage from 'assets/transactions/empty-image.svg'
import { institutionLogoMap } from 'containers/accounts/accounts.static'
import { DataTableHeader } from './dataTableHeader/dataTableHeader'
import { TransactionCards } from './transactionsCards/transactionsCards'
import { useIsMobile } from 'hooks/useIsMobile'
import { List } from 'components/list'
import type { IActionProps } from 'components/datatable/actions/actions'
import { HeaderTransactions } from 'shared/headerTransactions/headerTransactions'

export default function Transactions() {
  const { isMobile } = useIsMobile()

  const {
    transactions,
    meta,
    isLoading,
    selectedMonth,
    setSelectedMonth,
    handleFetchNextPage,
    handleMarkAsPaid,
  } = useTransactions()
  const { openDeleteModal } = useDeleteIncomeExpenseModal()

  const actions: IActionProps[] = [
    {
      icon: <IconChecks size={16} />,
      label: 'Mark as paid',
      onClick: handleMarkAsPaid,
      visible: ({ isPaid }: ResponseTransaction) => !isPaid,
    },
    {
      icon: <IconTrash size={16} />,
      label: 'Delete',
      onClick: openDeleteModal,
    },
  ]

  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Transactions</Header.Title>
        <Header.Subtitle>Pay your bills, transfer money and more</Header.Subtitle>
        <Header.RightSection>
          <HeaderTransactions selectedMonth={selectedMonth} />
        </Header.RightSection>
      </Header>
      <Flex direction="column" gap={16} h="100%">
        <DataTableHeader selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        <TransactionCards meta={meta} isLoading={isLoading} />
        <Flex direction="column" w="100%" h="calc(100% - 138px)">
          {isMobile ? (
            <List.Root data={transactions}>
              <List.Row actions={actions}>
                {(row) => (
                  <Stack key={row.id} w="100%">
                    <Flex align="center" justify="space-between">
                      <Flex direction="column">
                        <Flex align="center" gap={2} mb={8} style={{}}>
                          <Flex align="center" justify="center">
                            <IconInnerShadowLeftFilled size={16} />
                          </Flex>
                          <Title ml={2} size="12" style={{ whiteSpace: 'nowrap' }}>
                            {row.category.name}
                          </Title>
                        </Flex>
                        <Title size="sm">{row.title}</Title>
                        <Text size="xs" color="gray">
                          {dayjs(row.date).format('DD/MM/YYYY')}, {dayjs(row.date).format('HH:mm')}
                        </Text>
                        <Flex>
                          <Title
                            size="h5"
                            color={row.type === TransactionTypeEnum.INCOME ? 'green' : 'red'}
                          >
                            {row.type === TransactionTypeEnum.INCOME ? '+' : '-'}
                            {currencyFormat(row.amount)}
                          </Title>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Badge variant="light" color={row.isPaid ? 'green.6' : 'yellow.6'}>
                          {row.isPaid ? 'Paid' : 'Pending'}
                        </Badge>
                      </Flex>
                    </Flex>
                  </Stack>
                )}
              </List.Row>
            </List.Root>
          ) : (
            <Datatable
              columns={[
                {
                  accessor: 'isPaid',
                  title: 'Status',
                  width: 65,
                  render: ({ isPaid }: ResponseTransaction) => {
                    const icon = isPaid ? (
                      <IconCheck size={18} color="white" stroke={3} />
                    ) : (
                      <IconExclamationMark size={18} color="white" stroke={3} />
                    )

                    return (
                      <Flex justify="center">
                        <Tooltip label={isPaid ? 'Paid' : 'Pending'} position="left" withArrow>
                          <Flex
                            justify="center"
                            align="center"
                            h={28}
                            w={28}
                            bg={isPaid ? 'green.6' : 'yellow.6'}
                            style={{ borderRadius: '50%' }}
                          >
                            {icon}
                          </Flex>
                        </Tooltip>
                      </Flex>
                    )
                  },
                },
                { accessor: 'title', title: 'Title' },
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
                  render: ({ account }: ResponseTransaction) => {
                    return (
                      <Flex gap={2}>
                        <Flex align="center" justify="center">
                          <Image
                            src={institutionLogoMap[account.institution]}
                            width={24}
                            height={24}
                          />
                        </Flex>
                        <Flex ml={4} align="center" justify="center">
                          {account.name}
                        </Flex>
                      </Flex>
                    )
                  },
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
                        {capitalizeAllAndRemoveUnderscore(TransactionTypeEnum[type])}
                      </Badge>
                    )
                  },
                },
              ]}
              actions={actions}
              records={transactions}
              fetching={isLoading}
              emptyState={
                <EmptyState>
                  <EmptyState.Image src={EmptyImage} />
                  <EmptyState.Title>No transactions found</EmptyState.Title>
                  <EmptyState.Text>
                    You don&apos;t have any transactions for this month. Try adding one!
                  </EmptyState.Text>
                </EmptyState>
              }
              onScrollToBottom={handleFetchNextPage}
            />
          )}
        </Flex>
      </Flex>
    </PrivateContainer>
  )
}
