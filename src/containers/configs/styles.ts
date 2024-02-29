import styled from '@emotion/styled'

export const ConfigBox = styled.div<{ enabled: boolean }>`
  max-width: 18rem;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem;

  border-width: 1px;
  border-style: solid;
  border-radius: 0.5rem;

  background-color: ${({ theme }) =>
    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white};
  border-color: ${({ enabled, theme }) => (enabled ? theme.colors.green[6] : theme.colors.gray[3])};

  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
    cursor: pointer;
  }
`
