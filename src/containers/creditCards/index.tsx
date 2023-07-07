import { EmptyState, Header } from '@quantun/core'
import { Image, Flex, Button } from '@mantine/core'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'

import { PrivateContainer } from 'components/privateContainer'
import { Datatable } from 'components/datatable'

import EmptyImage from 'assets/creditCards/empty-image.svg'
import { FlagEnum } from 'api/creditCards/creditCards.types'

import { useCreditCards } from './useCreditCards'
import { flagLogoMap } from './creditCards.static'

export default function CreditCards() {
  const { records, isLoading } = useCreditCards()

  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Credit cards</Header.Title>
        <Header.Subtitle>Buy now, pay later. Manage your credit cards easily</Header.Subtitle>
        <Header.RightSection>
          <Button leftIcon={<IconPlus size={16} />}>Add Credit Card</Button>
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
        ]}
        actions={[
          {
            icon: <IconEdit size={16} />,
            label: 'Edit',
            onClick: () => {},
            // onClick: (row) => handleOpenEditModal(row),
          },
          {
            icon: <IconTrash size={16} />,
            label: 'Delete',
            onClick: () => {},
            // onClick: openDeleteModal,
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
    </PrivateContainer>
  )
}
