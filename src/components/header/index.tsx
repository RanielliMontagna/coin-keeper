import { Button, Title } from '@mantine/core'
import { Fab, SHeader } from './styles'
import { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface IHeaderProps {
  title: string
  button?: IButtonProps
}

export function Header({ title, button }: IHeaderProps) {
  return (
    <SHeader>
      <div>
        <Title order={2}>{title}</Title>
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
      </div>
    </SHeader>
  )
}
