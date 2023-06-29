import dayjs from 'dayjs'
import { Flex, SegmentedControl, Text, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { currencyFormat } from 'utils/currencyFormat'

import { dataExample } from './graph.static'
import SectionPaper from '../sectionPaper/sectionPaper'

export function Graph() {
  const { colorScheme, colors } = useMantineTheme()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <SectionPaper>
      <Flex justify="space-between" align="center">
        <Title size="sm">Total Revenue</Title>
        <SegmentedControl
          size={isMobile ? 'xs' : 'sm'}
          data={[
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ]}
          value="year"
        />
      </Flex>

      <ResponsiveContainer width="100%" height={isMobile ? 200 : 310}>
        <AreaChart data={dataExample}>
          <XAxis
            dataKey="month"
            fontSize={10}
            tickFormatter={(value: string) => {
              const numberMonth = Number(value)
              return dayjs()
                .month(numberMonth - 1)
                .format('MMM')
            }}
          />
          <YAxis tickFormatter={(value) => currencyFormat(value)} fontSize={10} />
          <Tooltip
            content={({ payload, label }) => {
              return (
                <div
                  style={{
                    background: `${colorScheme === 'dark' ? colors.gray[8] : colors.gray[0]}99`,
                    padding: 16,
                    borderRadius: 4,
                  }}
                >
                  <div>
                    <Text size="sm" color="gray.6">
                      Month:{' '}
                      {dayjs()
                        .month(Number(label) - 1)
                        .format('MMMM')}
                    </Text>
                    <Text size="sm" color={colorScheme === 'dark' ? 'gray.3' : 'gray.9'}>
                      Amount: {currencyFormat(Number(payload?.[0]?.value))}
                    </Text>
                  </div>
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={colors.blue[5]}
            fill={colorScheme === 'dark' ? colors.blue[9] : colors.blue[0]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </SectionPaper>
  )
}
