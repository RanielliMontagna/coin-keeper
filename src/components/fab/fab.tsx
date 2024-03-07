import React from 'react'
import { IconPlus } from '@tabler/icons-react'

import { Flex, Tooltip } from '@mantine/core'

import type { IFabProps } from './fab.types'
import { FabContainer, FabOverlay, FabPrincipalButton } from './fab.styles'
import { FabButton } from './fabButton/fabButton'
import { FabProvider, useFab } from './fab.context'

function FabRoot({ children, icon: Icon }: IFabProps) {
  const { isOpen, fabStackRef, overlayRef, highlightColor, handleToggleIsOpen } = useFab()

  const _childrenArray = React.Children.toArray(children)

  const _buttons = _childrenArray.filter((child) => (child as any).type === FabButton)
  const qtdButtons = _buttons.length

  if (qtdButtons === 1) {
    const { onPress, icon: Icon, label, style } = (_buttons[0] as any).props

    return (
      <>
        <FabContainer>
          <Tooltip label={label} withArrow position="left">
            <FabPrincipalButton highlightColor={highlightColor} onClick={onPress} style={style}>
              {Icon ? <Icon /> : <IconPlus />}
            </FabPrincipalButton>
          </Tooltip>
        </FabContainer>
      </>
    )
  }

  return (
    <>
      <FabContainer>
        {isOpen && (
          <Flex
            direction="column"
            mr={8}
            gap={16}
            ref={fabStackRef}
            align="flex-end"
            sx={{ transform: 'translateY(100%)', transition: 'all 0.3s ease' }}
          >
            {qtdButtons > 0 && _buttons}
          </Flex>
        )}
        <FabPrincipalButton highlightColor={highlightColor} onClick={() => handleToggleIsOpen()}>
          {Icon ? <Icon /> : <IconPlus />}
        </FabPrincipalButton>
      </FabContainer>
      {isOpen && <FabOverlay onClick={handleToggleIsOpen} ref={overlayRef} />}
    </>
  )
}

function FabRootWrapper(props: IFabProps) {
  return (
    <FabProvider highlightColor={props.highlightColor}>
      <FabRoot {...props} />
    </FabProvider>
  )
}

export { FabRootWrapper as FabRoot }

FabRoot.displayName = 'Fab'
