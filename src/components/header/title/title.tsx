import { FC, PropsWithChildren } from 'react'
import { Title as TitleMantine } from '@mantine/core'

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return <TitleMantine order={2}>{children}</TitleMantine>
}
