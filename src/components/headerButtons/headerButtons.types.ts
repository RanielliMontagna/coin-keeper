import { TablerIconsProps } from '@tabler/icons-react'

export interface IHeaderButtonProps {
  label: string
  onClick: () => void
  icon?: (props: TablerIconsProps) => JSX.Element
  style?: React.CSSProperties
  highlightColor?: string
}

export interface IHeaderButtonsRoot {
  children: React.ReactNode
}
