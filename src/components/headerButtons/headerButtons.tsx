import React from 'react'

import { Button, useMantineTheme } from '@mantine/core'

import { useIsMobile } from 'hooks/useIsMobile'

import type { IHeaderButtonProps, IHeaderButtonsRoot } from './headerButtons.types'
import { Fab } from '@quantun/core'
import { IconPlus } from '@tabler/icons-react'

export function HeaderButton({ label, onClick, icon: Icon }: IHeaderButtonProps) {
  const { isMobile } = useIsMobile()

  if (isMobile) return <Fab.Button onPress={onClick} label={label} icon={Icon ? Icon : IconPlus} />

  return (
    <Button onClick={onClick} leftIcon={Icon ? <Icon size={16} /> : <IconPlus size={16} />}>
      {label}
    </Button>
  )
}

export function HeaderButtonsRoot({ children }: IHeaderButtonsRoot) {
  const { colors } = useMantineTheme()
  const { isMobile } = useIsMobile()

  const _children = React.Children.toArray(children)

  const _buttons = _children.filter(
    (child): child is React.ReactElement<IHeaderButtonProps> =>
      React.isValidElement(child) && child.type === HeaderButton,
  )

  if (isMobile) {
    return (
      <Fab.Root highlightColor={colors.green[6]}>
        {_buttons?.map(({ props }) => (
          <Fab.Button
            key={props.label}
            onPress={props.onClick}
            label={props.label}
            icon={props.icon}
          />
        ))}
      </Fab.Root>
    )
  }

  return <>{_buttons}</>
}
