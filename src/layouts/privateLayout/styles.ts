import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface IPrivateLayoutProps {
  mobile: boolean
}

const mobileCss = css`
  flex-direction: column;
`

export const PrivateLayoutContainer = styled.div<IPrivateLayoutProps>`
  display: flex;
  overflow: auto;

  height: 100vh;

  background-color: ${({ theme }) => {
    if (theme.colorScheme === 'dark') {
      return theme.colors.dark[7]
    } else {
      return theme.colors.gray[1]
    }
  }};

  ${({ mobile }) => mobile && mobileCss}
`

export const OutletContainer = styled.div`
  flex: 1;
  overflow: auto;
`
