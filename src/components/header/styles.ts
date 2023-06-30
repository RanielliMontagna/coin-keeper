import styled from '@emotion/styled'
import { rem } from '@quantun/utils'
import { MOBILE_BREAKPOINT } from 'shared/constants'

export const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    text-align: center;
    flex-direction: column;
    gap: ${rem(16)};
  }
`
