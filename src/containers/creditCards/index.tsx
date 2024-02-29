import { EmptyState, Header } from '@quantun/core'
import { Image, Flex, Stack, Text, Progress } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import { PrivateContainer } from 'components/privateContainer'
import { Datatable } from 'components/datatable'
import { List } from 'components/list'
import { HeaderButtons } from 'components/headerButtons'
import { institutionLogoMap } from 'containers/accounts/accounts.static'
import { useIsMobile } from 'hooks/useIsMobile'

import EmptyImage from 'assets/creditCards/empty-image.svg'
import { FlagEnum } from 'api/creditCards/creditCards.types'

import { useCreditCards } from './useCreditCards'
import { flagLogoMap } from './creditCards.static'
import { AddEditCreditCardDialog } from './addEditCreditCardDialog/addEditCreditCardDialog'
import { useDeleteCreditCardModal } from './deleteCreditCardDialog/deleteCreditCardDialog'
import { ResponseAccount } from 'api/accounts/accounts.types'
import { currencyFormat } from 'utils/currencyFormat'
import type { IActionProps } from 'components/datatable/actions/actions'

export default function CreditCards() {
  const { records, isLoading, addEditModal, handleCloseEditModal, handleOpenEditModal } =
    useCreditCards()
  const { openDeleteModal } = useDeleteCreditCardModal()
  const { isMobile } = useIsMobile()

  const actions: IActionProps[] = [
    {
      icon: <IconEdit size={16} />,
      label: 'Edit',
      onClick: (row) => handleOpenEditModal(row),
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
        <Header.Title>Credit cards</Header.Title>
        <Header.Subtitle>Buy now, pay later. Manage your credit cards easily</Header.Subtitle>
        <Header.RightSection>
          <HeaderButtons.Root>
            <HeaderButtons.Button label="Add Credit Card" onClick={handleOpenEditModal} />
          </HeaderButtons.Root>
        </Header.RightSection>
      </Header>
      {isMobile ? (
        <List.Root data={records}>
          <List.Row actions={actions}>
            {(row) => {
              const limitNumber = Number(row.limit)
              const randomValue = Math.floor(Math.random() * limitNumber)

              const randomValuePercentage = Math.floor((randomValue / limitNumber) * 100)

              return (
                <Stack key={row.id} spacing={8} style={{ flex: 1 }}>
                  <Flex align="center" gap={8}>
                    <Image src={flagLogoMap[row.flag as FlagEnum]} width={35} />
                    <Text size="sm">{row.name}</Text>-<Text size="sm">{row.account.name}</Text>
                  </Flex>
                  <Flex align="center" gap={8}>
                    <Text size="sm">
                      Due day: <b>{row.dueDay}</b>
                    </Text>
                    <Text size="sm">
                      Closing day: <b>{row.closingDay}</b>
                    </Text>
                  </Flex>
                  <Flex align="center" gap={4}>
                    <Progress
                      style={{ width: '100%' }}
                      size="lg"
                      sections={[
                        {
                          value: randomValuePercentage,
                          color: 'gray',
                          label: `${randomValuePercentage}%`,
                        },
                      ]}
                    />
                    <Text size="sm">{currencyFormat(limitNumber)}</Text>
                  </Flex>
                </Stack>
              )
            }}
          </List.Row>
        </List.Root>
      ) : (
        <Datatable
          columns={[
            {
              accessor: 'flag',
              title: 'Flag',
              width: 60,
              render: ({ flag }: { flag: FlagEnum }) => {
                return (
                  <Flex align="center">
                    <Image src={flagLogoMap[flag]} width={40} />
                  </Flex>
                )
              },
            },
            {
              accessor: 'name',
              title: 'Name',
              render: ({ name }) => <Text style={{ whiteSpace: 'nowrap' }}>{name}</Text>,
            },
            {
              accessor: 'limit',
              title: 'Limit',
              render: ({ limit }) => {
                const limitNumber = Number(limit)
                const randomValue = Math.floor(Math.random() * limitNumber)

                const randomValuePercentage = Math.floor((randomValue / limitNumber) * 100)

                return (
                  <Flex align="center" gap={8} pr={8}>
                    <Progress
                      style={{ width: 250 }}
                      size="lg"
                      sections={[
                        {
                          value: randomValuePercentage,
                          color: 'gray',
                          label: `${randomValuePercentage}%`,
                        },
                      ]}
                    />
                    <Text size="sm">{currencyFormat(limitNumber)}</Text>
                  </Flex>
                )
              },
              width: 250,
            },
            {
              accessor: 'closingDay',
              title: 'Closing Day',
              width: 110,
              render: ({ closingDay }) => `${closingDay}th`,
            },
            {
              accessor: 'dueDay',
              title: 'Due Day',
              width: 110,
              render: ({ dueDay }) => `${dueDay}th`,
            },
            {
              accessor: 'account',
              title: 'Account',
              render: ({ account }: { account: ResponseAccount }) => (
                <Flex gap={2}>
                  <Flex align="center" justify="center">
                    <Image src={institutionLogoMap[account.institution]} width={24} height={24} />
                  </Flex>
                  <Flex ml={4} align="center" justify="center">
                    {account.name}
                  </Flex>
                </Flex>
              ),
            },
          ]}
          actions={actions}
          records={records}
          fetching={isLoading}
          emptyState={
            <EmptyState>
              <EmptyState.Image src={EmptyImage} />
              <EmptyState.Title>You don&apos;t have any credit card yet.</EmptyState.Title>
              <EmptyState.Text>
                Add your first credit card and start managing your expenses.
              </EmptyState.Text>
            </EmptyState>
          }
        />
      )}
      {addEditModal.opened && (
        <AddEditCreditCardDialog {...addEditModal.row} onClose={handleCloseEditModal} />
      )}
    </PrivateContainer>
  )
}
