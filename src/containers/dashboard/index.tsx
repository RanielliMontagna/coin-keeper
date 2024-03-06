import { Grid } from '@mantine/core'
import { Header } from '@quantun/core'

import { PrivateContainer } from 'components/privateContainer'
import { Cards } from './cards/cards'
import { Accounts } from './accounts/accounts'
import { Transactions } from './transactions/transactions'
import { Graph } from './graph/graph'
import { Quotes } from './quotes/quotes'
import { HeaderTransactions } from 'shared/headerTransactions/headerTransactions'

export default function Dashboard() {
  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Dashboard</Header.Title>
        <Header.Subtitle>Control your money, see your balance and summary</Header.Subtitle>
        <Header.RightSection>
          <HeaderTransactions />
        </Header.RightSection>
      </Header>
      <Grid>
        <Grid.Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <Cards />
          <Graph />
          <Quotes />
        </Grid.Col>
        <Grid.Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <Accounts />
          <Transactions />
        </Grid.Col>
      </Grid>
    </PrivateContainer>
  )
}
