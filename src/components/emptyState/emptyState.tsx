import React, { FC, PropsWithChildren } from 'react'

import {
  Stack,
  Title as TitleMantine,
  Image as ImageMantine,
  Text as TextMantine,
  Flex,
  useMantineTheme,
} from '@mantine/core'

interface IImageProps {
  src: string
}

const Image = ({ src }: IImageProps) => {
  return <ImageMantine src={src} maw={400} style={{ width: '70%' }} />
}

const Title: FC<PropsWithChildren> = ({ children }) => {
  const { colorScheme, colors, white } = useMantineTheme()

  return (
    <TitleMantine order={3} color={colorScheme === 'dark' ? white : colors.dark[9]}>
      {children}
    </TitleMantine>
  )
}

const Text: FC<PropsWithChildren> = ({ children }) => {
  const { colorScheme, colors } = useMantineTheme()

  return (
    <TextMantine size="sm" color={colorScheme === 'dark' ? colors.dark[2] : colors.dark[5]}>
      {children}
    </TextMantine>
  )
}

interface IEmptyStateProps extends PropsWithChildren {}

const EmptyStateWithoutMemo: FC<IEmptyStateProps> = ({ children }) => {
  const _childrenArray = React.Children.toArray(children)

  const _image = _childrenArray.find((child) => (child as any).type === Image)
  const _title = _childrenArray.find((child) => (child as any).type === Title)
  const _text = _childrenArray.find((child) => (child as any).type === Text)

  return (
    <Stack align="center" spacing="lg">
      {_image}
      <Flex direction="column" align="center">
        {_title}
        {_text}
      </Flex>
    </Stack>
  )
}

const EmptyState = React.memo(
  EmptyStateWithoutMemo,
) as React.NamedExoticComponent<IEmptyStateProps> & {
  Title: React.ComponentType<React.ComponentProps<typeof Title>>
  Text: React.ComponentType<React.ComponentProps<typeof Text>>
  Image: React.ComponentType<React.ComponentProps<typeof Image>>
}

EmptyState.Image = Image
EmptyState.Title = Title
EmptyState.Text = Text

export { EmptyState }
