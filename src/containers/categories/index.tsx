import { Header, EmptyState } from '@quantun/core'
import { Stack, Text, Flex, Input } from '@mantine/core'
import { IconEdit, IconInnerShadowLeftFilled, IconSearch, IconTrash } from '@tabler/icons-react'

import { PrivateContainer } from 'components/privateContainer'
import { Datatable } from 'components/datatable'
import { DescriptionRowRender } from 'components/descriptionRowRender/descriptionRowRender'
import { HeaderButtons } from 'components/headerButtons'
import { IActionProps } from 'components/datatable/actions/actions'
import { useIsMobile } from 'hooks/useIsMobile'

import { useCategories } from './useCategories'
import { CategoryColorsEnum } from 'api/categories/categories.types'
import { categoryColors } from './categories.static'

import { AddEditCategoryDialog } from './addEditCategoryDialog/addEditCategoryDialog'
import { useDeleteCategoryModal } from './deleteCategoryDialog/deleteCategoryDialog'

import EmptyImage from 'assets/categories/empty-image.svg'
import EmptySearch from 'assets/categories/empty-search.svg'
import { List } from 'components/list'

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
        <Header.Title>Categories</Header.Title>
        <Header.Subtitle>Organize your transactions with zero effort</Header.Subtitle>
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
            <HeaderButtons.Button label="Add Category" onClick={handleOpenEditModal} />
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
                    <IconInnerShadowLeftFilled
                      style={{ color: categoryColors[row.color as CategoryColorsEnum] }}
                      size={28}
                    />
                    {row.name}
                  </Flex>
                  <Flex align="center" gap={4}>
                    <Text size="sm">{row.description}</Text>
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
              render: ({ description }: { description: string }) => {
                return <DescriptionRowRender description={description} />
              },
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
                {search ? 'No results found' : 'You have no categories yet'}
              </EmptyState.Title>
              <EmptyState.Text>
                {search ? 'Try another search query' : 'Create your first category to get started'}
              </EmptyState.Text>
            </EmptyState>
          }
        />
      )}
      {addEditModal.opened && (
        <AddEditCategoryDialog onClose={handleCloseEditModal} {...addEditModal.row} />
      )}
    </PrivateContainer>
  )
}
