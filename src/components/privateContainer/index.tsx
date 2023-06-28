import { MainContainer } from './styles'

interface PrivateContainerProps {
  children: React.ReactNode
}

export function PrivateContainer({ children }: PrivateContainerProps) {
  return <MainContainer>{children}</MainContainer>
}
