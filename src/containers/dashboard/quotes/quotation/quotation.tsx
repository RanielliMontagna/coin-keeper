import { useMemo } from 'react'

import { Center, Flex, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'
import { rem } from '@quantun/utils'
import {
  IconCurrencyBitcoin,
  IconCurrencyDollar,
  IconCurrencyEuro,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react'

import SectionPaper from 'containers/dashboard/sectionPaper/sectionPaper'
import { capitalize } from 'utils/capitalize'
import { currencyFormat } from 'utils/currencyFormat'

export enum QuotationType {
  DOLAR = 0,
  EURO = 1,
  BITCOIN = 2,
  IBOVESPA = 3,
}

interface IQuotationProps {
  type: QuotationType
  amount: number | string
  variation: number | string
  isLoading?: boolean
}

export function Quotation({ type, amount, variation, isLoading }: IQuotationProps) {
  if (isLoading) {
    return <Skeleton style={{ flex: 1, height: 75 }} />
  }

  const { colors } = useMantineTheme()
  const title = capitalize(QuotationType[type])

  const icon = useMemo(() => {
    const bg = {
      0: colors.green[2],
      1: colors.blue[2],
      2: colors.yellow[2],
      3: colors.green[2],
    }

    const icon = {
      0: <IconCurrencyDollar size={32} color={colors.green[6]} />,
      1: <IconCurrencyEuro size={32} color={colors.blue[6]} />,
      2: <IconCurrencyBitcoin size={32} color={colors.yellow[6]} />,
      3: <IconTrendingUp size={32} color={colors.green[6]} />,
    }

    return (
      <Center
        style={{
          backgroundColor: bg[type],
          borderRadius: rem(4),
          padding: rem(4),
        }}
      >
        {icon[type]}
      </Center>
    )
  }, [type])

  return (
    <SectionPaper style={{ flex: 1 }}>
      <Flex align="center" gap="xs">
        <div>{icon}</div>
        <Flex direction="column">
          <Text size="sm" color="gray.6">
            {title}
          </Text>
          <Title
            order={6}
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            {title === 'Ibovespa'
              ? `${currencyFormat(Number(amount)).replace('R$', '').replace(/\xA0/g, ' ')} pts`
              : currencyFormat(Number(amount))}
          </Title>
          <Text
            size="xs"
            color="gray.6"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: rem(4),
            }}
          >
            {Number(variation) > 0 ? <IconTrendingUp size={16} /> : <IconTrendingDown size={16} />}
            {Number(variation) > 0 ? '+' : ''}
            {Number(variation).toFixed(4)}%
          </Text>
        </Flex>
      </Flex>
    </SectionPaper>
  )
}
