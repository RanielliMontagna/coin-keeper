import { Button } from '@mantine/core'

export interface IActionProps {
  label: string
  icon?: React.ReactNode
  onClick: (row: any) => void
  visible?: (row: any) => boolean
}

export function Actions({ label, icon, onClick }: IActionProps) {
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
