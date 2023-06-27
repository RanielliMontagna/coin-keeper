import styled from '@emotion/styled'
import { rem } from '@mantine/core'

export const PrivacyContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const PrivacyContent = styled.div`
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

  @media (max-width: 768px) {
    padding: ${rem(32)};
  }
`
