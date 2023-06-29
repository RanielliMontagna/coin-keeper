import { PrivateContainer } from 'components/privateContainer'
import { Header } from 'components/header'

export default function Transactions() {
  return (
    <PrivateContainer>
      <Header title="Transactions" subtitle="Pay your bills, transfer money and more" />
    </PrivateContainer>
  )
}
