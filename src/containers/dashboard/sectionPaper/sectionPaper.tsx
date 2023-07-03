import { memo } from 'react'
import { Flex, FlexProps, useMantineTheme } from '@mantine/core'

interface ISectionPaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  flexProps?: FlexProps
}

const SectionPaper = ({ children, flexProps, ...rest }: ISectionPaperProps) => {
  const { colorScheme, white, shadows } = useMantineTheme()

  return (
    <section {...rest}>
      <Flex
        direction="column"
        bg={colorScheme === 'dark' ? 'dark.8' : white}
        p={16}
        {...flexProps}
        style={{
          borderRadius: 8,
          flex: 1,
          boxShadow: shadows.xs,
          ...flexProps?.style,
        }}
      >
        {children}
      </Flex>
    </section>
  )
}

export default memo(SectionPaper)
