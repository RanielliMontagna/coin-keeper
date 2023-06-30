import styled from '@emotion/styled'
import { rem } from '@mantine/core'

import { MOBILE_BREAKPOINT } from 'shared/constants'

export const TermsContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const TermsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: ${rem(1120)};

  gap: ${rem(32)};
  padding: ${rem(64)};

  > div {
    display: grid;
    grid-template-columns: 1fr;
    gap: ${rem(4)};
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: ${rem(32)};
  }
`
