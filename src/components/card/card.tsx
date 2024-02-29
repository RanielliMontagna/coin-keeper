import { useMemo } from 'react'

import { Avatar, Flex, Skeleton, Text, Title } from '@mantine/core'

import SectionPaper from 'containers/dashboard/sectionPaper/sectionPaper'
import { currencyFormat } from 'utils/currencyFormat'

import type { ICardProps } from './card.types'

export function Card({ title, icon, amount, isLoading = false }: ICardProps) {
  const iconWithAvatar = useMemo(
    () => (
      <Avatar size={40} style={{ marginRight: 10 }}>
        {icon}
      </Avatar>
    ),
    [icon],
  )

  return (
    <SectionPaper style={{ flex: 1 }}>
      <Flex justify="space-between" align="center" gap={8}>
        <Flex direction="column">
          <Text size="sm" color="gray.6" style={{ whiteSpace: 'nowrap' }}>
            {title}
          </Text>
          {isLoading ? (
            <Skeleton style={{ marginTop: 6, height: 25 }} />
          ) : (
            <Flex>
              <Title order={3} style={{ whiteSpace: 'nowrap' }}>
                {currencyFormat(amount || 0)}
              </Title>
            </Flex>
          )}
        </Flex>
        {iconWithAvatar}
      </Flex>
    </SectionPaper>
  )
}
