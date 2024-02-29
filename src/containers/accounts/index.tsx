import { Header, EmptyState } from '@quantun/core'
import { Input, Title, Text, Flex, Image, Stack } from '@mantine/core'
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react'

import { IActionProps } from 'components/datatable/actions/actions'
import { PrivateContainer } from 'components/privateContainer'
import { HeaderButtons } from 'components/headerButtons'
import { Datatable } from 'components/datatable'
import { List } from 'components/list'
import { capitalizeAllAndRemoveUnderscore } from 'utils/capitalize'
import { currencyFormat } from 'utils/currencyFormat'
import { useIsMobile } from 'hooks/useIsMobile'
import { InstitutionTypeEnum } from 'api/accounts/accounts.types'

import { useAccounts } from './useAccounts'
import { institutionLogoMap } from './accounts.static'
import { AddEditAccountDialog } from './addEditAccountDialog/addEditAccountDialog'
import { useDeleteAccountModal } from './deleteAccountDialog/deleteAccountDialog'

import EmptyImage from 'assets/accounts/empty-image.svg'
import EmptySearch from 'assets/accounts/empty-search.svg'

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
        <Header.Title>Accounts</Header.Title>
        <Header.Subtitle>Manage your accounts easily</Header.Subtitle>
        <Header.RightSection>
          <div>
            <Input
              icon={<IconSearch size={16} />}
              placeholder="Search"
              defaultValue={search}
              onChange={onChange}
            />
          </div>
          <HeaderButtons.Root>
            <HeaderButtons.Button label="Add Account" onClick={handleOpenEditModal} />
          </HeaderButtons.Root>
        </Header.RightSection>
      </Header>
      {isMobile ? (
        <List.Root data={records}>
          <List.Row actions={actions}>
            {(row) => {
              return (
                <Stack key={row.id} spacing={8}>
                  <Flex align="center" gap={4}>
                    <Image
                      src={institutionLogoMap[row.institution as InstitutionTypeEnum]}
                      width={28}
                      height={28}
                    />
                    {row.name}
                  </Flex>
                  <Flex align="center" gap={4}>
                    <Text size="sm">Balance:</Text>
                    <Title order={5}>{currencyFormat(row.balance)}</Title>
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
              accessor: 'name',
              title: 'Name',
            },
            {
              accessor: 'institution',
              title: 'Institution',
              render: ({ institution }: { institution: InstitutionTypeEnum }) => (
                <Flex align="center" gap={8}>
                  <Image src={institutionLogoMap[institution]} width={28} height={28} />
                  {capitalizeAllAndRemoveUnderscore(InstitutionTypeEnum[institution])}
                </Flex>
              ),
            },
            {
              accessor: 'balance',
              title: 'Balance',
              render: ({ balance }: { balance: string }) => currencyFormat(balance),
            },
          ]}
          actions={actions}
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
      )}
      {addEditModal.opened && (
        <AddEditAccountDialog onClose={handleCloseEditModal} {...addEditModal.row} />
      )}
    </PrivateContainer>
  )
}
