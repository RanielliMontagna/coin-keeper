import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  primaryColor: 'green',
  fontFamily: 'Inter, sans-serif',
  globalStyles: ({ colors, colorScheme }) => ({
    '*': {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,

      '&::-webkit-scrollbar': {
        width: 8,
        height: 8,
      },
      '&::-webkit-scrollbar-track': {
        background: colorScheme === 'dark' ? colors.dark[6] : colors.gray[1],
      },
      '&::-webkit-scrollbar-thumb': {
        background: colorScheme === 'dark' ? colors.dark[5] : colors.gray[3],
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: colorScheme === 'dark' ? colors.dark[4] : colors.gray[4],
      },
    },
  }),
}

export type ThemeOverride = typeof theme
