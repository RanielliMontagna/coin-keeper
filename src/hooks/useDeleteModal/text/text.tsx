import { FC, PropsWithChildren } from 'react'
import { Text as TextMantine } from '@mantine/core'

export const Text: FC<PropsWithChildren> = ({ children }) => {
  return <TextMantine size="sm">{children}</TextMantine>
}
