import { PrivateContainer } from 'components/privateContainer'
import { Header } from 'components/header'

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
