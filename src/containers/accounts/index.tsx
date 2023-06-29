import { PrivateContainer } from 'components/privateContainer'
import { Header } from 'components/header'

export default function Accounts() {
  return (
    <PrivateContainer>
      <Header title="Accounts" subtitle="Manage your accounts easily" />
    </PrivateContainer>
  )
}
