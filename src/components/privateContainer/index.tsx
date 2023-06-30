import { MainContainer } from './styles'

interface PrivateContainerProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function PrivateContainer({ children, style }: PrivateContainerProps) {
  return <MainContainer style={style}>{children}</MainContainer>
}
