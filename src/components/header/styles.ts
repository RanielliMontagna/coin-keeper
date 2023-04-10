import styled from '@emotion/styled'
import { Button, ButtonProps, rem } from '@mantine/core'

export const SHeader = styled.header`
  height: ${rem(100)};
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => {
    if (theme.colorScheme === 'dark') {
      return theme.colors.dark[8]
    } else {
      return theme.colors.gray[0]
    }
  }};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 ${rem(64)};
    width: ${rem(1200)};

    @media (max-width: ${rem(1200)}) {
      padding: 0 ${rem(32)};
    }

    @media (max-width: ${rem(768)}) {
      padding: 0 ${rem(16)};
      flex-direction: column;
      justify-content: center;
    }
  }

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
