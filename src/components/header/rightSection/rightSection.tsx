import { FC, PropsWithChildren } from 'react'

import { Flex, FlexProps } from '@mantine/core'

interface IRightSectionProps extends PropsWithChildren, FlexProps {}

export const RightSection: FC<IRightSectionProps> = ({ children }) => {
  return <Flex gap={16}>{children}</Flex>
}
