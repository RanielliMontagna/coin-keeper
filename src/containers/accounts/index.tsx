import { Header, EmptyState } from '@quantun/core'
import { Button, Input, Flex, Image } from '@mantine/core'
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'

import { PrivateContainer } from 'components/privateContainer'
import { Datatable } from 'components/datatable'
import { currencyFormat } from 'utils/currencyFormat'

import { useAccounts } from './useAccounts'
import { AddEditAccountDialog } from './addEditAccountDialog/addEditAccountDialog'
import { useDeleteAccountModal } from './deleteAccountDialog/deleteAccountDialog'

import EmptyImage from 'assets/accounts/empty-image.svg'
import EmptySearch from 'assets/accounts/empty-search.svg'
import { capitalize } from 'utils/capitalize'
import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import { institutionLogoMap } from './accounts.static'

export default function Accounts() {
  const {
    records,
    isLoading,
    search,
    addEditModal,
    onChange,
    handleCloseEditModal,
    handleOpenEditModal,
  } = useAccounts()
  const { openDeleteModal } = useDeleteAccountModal()

  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Accounts</Header.Title>
        <Header.Subtitle>Manage your accounts easily</Header.Subtitle>
        <Header.RightSection>
          <Input
            icon={<IconSearch size={16} />}
            placeholder="Search"
            defaultValue={search}
            onChange={onChange}
          />
          <Button leftIcon={<IconPlus size={16} />} onClick={() => handleOpenEditModal()}>
            Add Account
          </Button>
        </Header.RightSection>
      </Header>
      <Datatable
        columns={[
          {
            accessor: 'name',
            title: 'Name',
          },
          {
            accessor: 'institution',
            title: 'Institution',
            render: ({ institution }: { institution: InstitutionTypeEnum }) => (
              <Flex align="center" gap={8}>
                <Image src={institutionLogoMap[institution]} width={28} height={28} />
                {capitalize(institution)}
              </Flex>
            ),
          },
          {
            accessor: 'balance',
            title: 'Balance',
            render: ({ balance }: { balance: string }) => currencyFormat(balance),
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
            <EmptyState.Image src={search ? EmptySearch : EmptyImage} />
            <EmptyState.Title>
              {search ? 'No results found' : 'You have no accounts yet'}
            </EmptyState.Title>
            <EmptyState.Text>
              {search ? 'Try another search query' : 'Create your first account to get started'}
            </EmptyState.Text>
          </EmptyState>
        }
      />
      {addEditModal.opened && (
        <AddEditAccountDialog onClose={handleCloseEditModal} {...addEditModal.row} />
      )}
    </PrivateContainer>
  )
}
