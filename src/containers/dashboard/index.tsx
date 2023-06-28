import { Grid } from '@mantine/core'
import { Header } from 'components/header'

import { PrivateContainer } from 'components/privateContainer'
import { Cards } from './cards/cards'
import { Accounts } from './accounts/accounts'
import { Transactions } from './transactions/transactions'
import { Graph } from './graph/graph'
import { Quotes } from './quotes/quotes'

export function Dashboard() {
  return (
    <PrivateContainer>
      <Header title="Dashboard" subtitle="Control your money, see your balance and summary" />
      <Grid gutter={32}>
        <Grid.Col
          xs={12}
          sm={6}
          md={8}
          lg={8}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <Cards />
          <Graph />
          <Quotes />
        </Grid.Col>
        <Grid.Col
          xs={12}
          sm={6}
          md={4}
          lg={4}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <Accounts />
          <Transactions />
        </Grid.Col>
      </Grid>
    </PrivateContainer>
  )
}
