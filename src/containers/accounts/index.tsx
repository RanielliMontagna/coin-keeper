import { Button, Input } from '@mantine/core'
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'

import { PrivateContainer } from 'components/privateContainer'
import { Header } from 'components/header'
import { Datatable } from 'components/datatable'
import { EmptyState } from 'components/emptyState/emptyState'

import { useAccounts } from './useAccounts'

import EmptyImage from 'assets/accounts/empty-image.svg'
import EmptySearch from 'assets/accounts/empty-search.svg'
import { AddEditAccountDialog } from './addEditAccountDialog/addEditAccountDialog'
import { useDeleteAccountModal } from './removeAccountDialog/removeAccountDialog'

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
            accessor: 'balance',
            title: 'Balance',
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
