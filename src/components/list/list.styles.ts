import styled from '@emotion/styled'

export const ListPaper = styled.div`
  background: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  height: 100%;

  border-radius: 8px;
  padding: 16px;

  overflow: auto;
`
