import { IconPlus } from '@tabler/icons-react'
import { Text } from '@mantine/core'

import type { IFabButtonProps } from '../fab.types'
import { FabSecondaryButton } from '../fab.styles'
import { useFab } from '../fab.context'

export function FabButton({ onPress, icon: Icon, label, ...rest }: IFabButtonProps) {
  const { highlightColor, handleToggleIsOpen } = useFab()

  function onPressWrapper() {
    onPress()
    handleToggleIsOpen()
  }

  return (
    <FabSecondaryButton
      onClick={onPressWrapper}
      highlightColor={rest.highlightColor || highlightColor}
      style={rest.style}
    >
      <Text size="sm" className="text">
        {label}
      </Text>
      <div className="icon">{Icon ? <Icon /> : <IconPlus />}</div>
    </FabSecondaryButton>
  )
}
