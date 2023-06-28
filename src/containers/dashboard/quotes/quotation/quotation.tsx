import { Center, Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { rem } from '@quantun/utils'
import {
  IconCurrencyBitcoin,
  IconCurrencyDollar,
  IconCurrencyEuro,
  IconTrendingUp,
} from '@tabler/icons-react'
import SectionPaper from 'containers/dashboard/sectionPaper/sectionPaper'
import { useMemo } from 'react'
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
  amount: number
}

export function Quotation({ type, amount }: IQuotationProps) {
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
            {title === 'Ibovespa' ? `${currencyFormat(amount)} pts` : currencyFormat(amount)}
          </Title>
        </Flex>
      </Flex>
    </SectionPaper>
  )
}
