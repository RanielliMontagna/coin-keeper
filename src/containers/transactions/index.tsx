import { Header } from '@quantun/core'

import { PrivateContainer } from 'components/privateContainer'

export default function Transactions() {
  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Transactions</Header.Title>
        <Header.Subtitle>Pay your bills, transfer money and more</Header.Subtitle>
      </Header>
    </PrivateContainer>
  )
}
