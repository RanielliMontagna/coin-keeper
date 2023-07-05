import dayjs from 'dayjs'
import { Flex, SegmentedControl, Text, Title, useMantineTheme } from '@mantine/core'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { currencyFormat } from 'utils/currencyFormat'
import { useIsMobile } from 'hooks/useIsMobile'

import SectionPaper from '../sectionPaper/sectionPaper'
import { useGraph } from './useGraph'

export function Graph() {
  const { period, treatedData, handlePeriodChange } = useGraph()
  const { colorScheme, colors } = useMantineTheme()
  const { isMobile } = useIsMobile()

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
          value={period}
          onChange={handlePeriodChange}
        />
      </Flex>

      <ResponsiveContainer width="100%" height={isMobile ? 200 : 310}>
        <AreaChart data={treatedData}>
          <XAxis
            dataKey="index"
            fontSize={10}
            tickFormatter={(value: string) => {
              if (period === 'week') {
                return dayjs().day(Number(value)).format('ddd')
              } else if (period === 'month') {
                return dayjs()
                  .date(Number(value + 1))
                  .format('DD')
              } else {
                return dayjs().month(Number(value)).format('MMM')
              }
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
            dataKey="balance"
            stackId="1"
            stroke={colors.blue[5]}
            fill={colorScheme === 'dark' ? colors.blue[9] : colors.blue[0]}
          />
          <Area
            type="monotone"
            dataKey="incomes"
            stackId="2"
            stroke={colors.green[5]}
            fill={colorScheme === 'dark' ? colors.green[9] : colors.green[0]}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="3"
            stroke={colors.red[5]}
            fill={colorScheme === 'dark' ? colors.red[9] : colors.red[0]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </SectionPaper>
  )
}
