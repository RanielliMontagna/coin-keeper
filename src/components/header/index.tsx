import { Button, Text, Title } from '@mantine/core'
import { Fab, SHeader } from './styles'
import { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface IHeaderProps {
  title: string
  subtitle?: string
  button?: IButtonProps
}

export function Header({ title, subtitle, button }: IHeaderProps) {
  return (
    <SHeader>
      <div>
        <Title order={2}>{title}</Title>
        {subtitle && (
          <Text size="xs" color="gray.6">
            {subtitle}
          </Text>
        )}
      </div>
      {button && (
        <>
          <Button className="webButton" {...button}>
            {button?.children}
          </Button>
          <Fab className="mobileButton" size="md" {...button}>
            {button?.children}
          </Fab>
        </>
      )}
    </SHeader>
  )
}
