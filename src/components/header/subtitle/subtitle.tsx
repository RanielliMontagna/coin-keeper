import { FC, PropsWithChildren } from 'react'
import { Text } from '@mantine/core'

export const Subtitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text size="xs" color="gray.6">
      {children}
    </Text>
  )
}
