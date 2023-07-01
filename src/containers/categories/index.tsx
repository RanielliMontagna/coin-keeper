import { Header } from '@quantun/core'

import { PrivateContainer } from 'components/privateContainer'

export default function Categories() {
  return (
    <PrivateContainer>
      <Header>
        <Header.Title>Categories</Header.Title>
        <Header.Subtitle>Organize your transactions with zero effort</Header.Subtitle>
      </Header>
    </PrivateContainer>
  )
}
