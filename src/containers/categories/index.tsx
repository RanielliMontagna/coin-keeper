import { Header, EmptyState } from '@quantun/core'
import { Button, Flex, Input } from '@mantine/core'
import {
  IconEdit,
  IconInnerShadowLeftFilled,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react'

import { PrivateContainer } from 'components/privateContainer'
import { Datatable } from 'components/datatable'

import { useCategories } from './useCategories'
import { CategoryColorsEnum } from 'api/categories/categories.types'
import { categoryColors } from './categories.static'

import { AddEditCategoryDialog } from './addEditCategoryDialog/addEditCategoryDialog'
import { useDeleteCategoryModal } from './removeCategoryDialog/removeCategoryDialog'

export default function Categories() {
  const {
    records,
    isLoading,
    search,
    addEditModal,
    onChange,
    handleCloseEditModal,
    handleOpenEditModal,
  } = useCategories()
  const { openDeleteModal } = useDeleteCategoryModal()

  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Categories</Header.Title>
        <Header.Subtitle>Organize your transactions with zero effort</Header.Subtitle>
        <Header.RightSection>
          <Input
            icon={<IconSearch size={16} />}
            placeholder="Search"
            defaultValue={search}
            onChange={onChange}
          />
          <Button leftIcon={<IconPlus size={16} />} onClick={() => handleOpenEditModal()}>
            Add Category
          </Button>
        </Header.RightSection>
      </Header>
      <Datatable
        columns={[
          {
            accessor: 'color',
            title: 'Color',
            width: 58,
            render: ({ color }: { color: CategoryColorsEnum }) => {
              return (
                <Flex align="center" justify="center">
                  <IconInnerShadowLeftFilled style={{ color: categoryColors[color] }} size={28} />
                </Flex>
              )
            },
          },
          {
            accessor: 'name',
            title: 'Name',
          },
          {
            accessor: 'description',
            title: 'Description',
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
            {/* <EmptyState.Image src={search ? EmptySearch : EmptyImage} /> */}
            <EmptyState.Title>
              {search ? 'No results found' : 'You have no categories yet'}
            </EmptyState.Title>
            <EmptyState.Text>
              {search ? 'Try another search query' : 'Create your first category to get started'}
            </EmptyState.Text>
          </EmptyState>
        }
      />
      {addEditModal.opened && (
        <AddEditCategoryDialog onClose={handleCloseEditModal} {...addEditModal.row} />
      )}
    </PrivateContainer>
  )
}
