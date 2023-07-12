import { EmptyState, Header } from '@quantun/core'
import { Image, Flex } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import { PrivateContainer } from 'components/privateContainer'
import { Datatable } from 'components/datatable'

import EmptyImage from 'assets/creditCards/empty-image.svg'
import { FlagEnum } from 'api/creditCards/creditCards.types'

import { useCreditCards } from './useCreditCards'
import { flagLogoMap } from './creditCards.static'
import { AddEditCreditCardDialog } from './addEditCreditCardDialog/addEditCreditCardDialog'
import { useDeleteCreditCardModal } from './deleteCreditCardDialog/deleteCreditCardDialog'
import { ResponseAccount } from 'api/accounts/accounts.types'
import { institutionLogoMap } from 'containers/accounts/accounts.static'
import { HeaderButtons } from 'components/headerButtons'

export default function CreditCards() {
  const { records, isLoading, addEditModal, handleCloseEditModal, handleOpenEditModal } =
    useCreditCards()
  const { openDeleteModal } = useDeleteCreditCardModal()

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
          { accessor: 'name', title: 'Name' },
          { accessor: 'limit', title: 'Limit' },
          { accessor: 'closingDay', title: 'Closing Day' },
          { accessor: 'dueDay', title: 'Due Day' },
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
        actions={[
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
        ]}
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
      {addEditModal.opened && (
        <AddEditCreditCardDialog {...addEditModal.row} onClose={handleCloseEditModal} />
      )}
    </PrivateContainer>
  )
}
