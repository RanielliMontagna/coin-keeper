import styled from '@emotion/styled'
import { rem } from '@quantun/utils'

import { MOBILE_BREAKPOINT } from 'shared/constants'

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: ${rem(32)};
  gap: ${rem(16)};

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: ${rem(16)};
  }
`
