import styled from '@emotion/styled'
import { rem } from '@mantine/core'

interface IOutletContainerProps {
  withHeader?: boolean
}

export const OutletContainer = styled.div<IOutletContainerProps>`
  height: ${({ withHeader }) => {
    return withHeader ? `calc(100vh - ${rem(60)})` : '100vh'
  }};

  overflow: auto;
`
