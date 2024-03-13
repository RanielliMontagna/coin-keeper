import { ButtonProps } from '@mantine/core'
import { TablerIconsProps } from '@tabler/icons-react'

export interface IHeaderButtonProps extends ButtonProps {
  label: string
  onClick: () => void
  icon?: (props: TablerIconsProps) => JSX.Element
  highlightColor?: string
}

export interface IHeaderButtonsRoot {
  children: React.ReactNode
}
