import styled from '@emotion/styled'
import { rem } from '@mantine/core'

import type { IFabProps } from './fab.types'

const bottomBarHeight = 75

export const FabContainer = styled.div`
  z-index: 102;
  position: fixed;
  bottom: ${rem(bottomBarHeight + 16)};
  right: ${rem(16)};

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${rem(16)};
`

export const FabOverlay = styled.div`
  z-index: 101;
  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: all 0.2s ease-in-out;
`

export const FabPrincipalButton = styled.button<Omit<IFabProps, 'children'>>`
  width: 56px;
  height: 56px;

  border-radius: 50%;
  border: 0;

  background-color: ${({ theme, highlightColor }) => highlightColor || theme.colors.blue[6]};
  color: ${({ theme }) => theme.white};

  box-shadow: ${({ theme }) => theme.shadows.md};

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`

export const FabSecondaryButton = styled.button<Omit<IFabProps, 'children'>>`
  border: none;
  background-color: transparent;

  display: flex;
  align-items: center;
  gap: ${rem(8)};

  .text {
    background-color: ${({ highlightColor }) => highlightColor};
    color: ${({ theme }) => theme.white};
    padding: ${rem(4)} ${rem(8)};
    border-radius: ${rem(8)};
  }

  div.icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ highlightColor }) => highlightColor};
    color: ${({ theme }) => theme.white};
  }

  &:hover {
    transform: scale(1.1) translateX(-${rem(5)});
  }

  transition: all 0.2s ease-in-out;
`
