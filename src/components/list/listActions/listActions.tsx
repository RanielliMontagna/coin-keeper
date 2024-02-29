import { Button } from '@mantine/core'
import type { IActionProps } from 'components/datatable/actions/actions'

export function ListActions({ label, icon, onClick }: IActionProps) {
  return (
    <Button
      variant="link"
      color="gray"
      size="xs"
      leftIcon={icon}
      onClick={onClick}
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      {label}
    </Button>
  )
}
