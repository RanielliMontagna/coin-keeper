import { memo } from 'react'
import { Flex, FlexProps, useMantineTheme } from '@mantine/core'

interface ISectionPaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  flexProps?: FlexProps
}

const SectionPaper = ({ children, flexProps, ...rest }: ISectionPaperProps) => {
  const { colorScheme, shadows } = useMantineTheme()

  return (
    <section {...rest}>
      <Flex
        direction="column"
        bg={colorScheme === 'dark' ? 'gray.9' : 'gray.0'}
        p={16}
        {...flexProps}
        style={{
          borderRadius: 8,
          flex: 1,
          transition: 'all 0.3s ease',
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
