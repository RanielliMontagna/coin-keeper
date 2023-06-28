import styled from '@emotion/styled'
import { rem } from '@quantun/utils'

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: ${rem(32)};
  gap: ${rem(16)};

  @media (max-width: 768px) {
    padding: ${rem(16)};
  }
`
