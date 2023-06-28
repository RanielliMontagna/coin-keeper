import styled from '@emotion/styled'
import { Button, ButtonProps, rem } from '@mantine/core'

export const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .webButton {
    display: block;
  }

  .mobileButton {
    display: none;
  }

  @media (max-width: ${rem(768)}) {
    .mobileButton {
      display: block;
    }

    .webButton {
      display: none;
    }
  }
`

export const Fab = styled(Button)<ButtonProps>`
  position: fixed;
  bottom: ${rem(32)};
  right: ${rem(32)};

  border-radius: 32px;
`
