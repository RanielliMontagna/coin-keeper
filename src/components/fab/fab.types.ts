import { TablerIconsProps } from '@tabler/icons-react'

export interface IFabContextProps {
  isOpen: boolean
  fabStackRef: React.RefObject<HTMLDivElement>
  overlayRef: React.RefObject<HTMLDivElement>
  highlightColor: string
  handleToggleIsOpen: () => void
}

export interface IFabProps {
  /**
   * The buttons to display in the FAB
   * @default undefined
   *
   * @example
   * <Fab.Root>
   *  <Fab.Button label="Add" />
   * </Fab.Root>
   */
  children: React.ReactNode

  /**
   * The color to use as background for the button
   * @default theme.colors.blue[6]
   *
   * @example
   * <Fab highlightColor="red" />
   */
  highlightColor?: string

  /**
   * The icon to display in the principal button
   * @default IconPlus
   *
   * @example
   * <Fab.Root icon={IconPlus} />
   */
  icon?: (props: TablerIconsProps) => JSX.Element
}

export interface IFabButtonProps {
  /**
   * The icon to display in the button
   * @default IconPlus
   *
   * @example
   * <Fab.Button icon={IconPlus} />
   */
  icon?: (props: TablerIconsProps) => JSX.Element

  /**
   * Function to execute when the button is clicked
   *
   * @example
   * <Fab.Button onPress={() => console.log('clicked')} />
   */
  onPress: () => void

  /**
   * Label to display in the button
   * @default false
   *
   * @example
   * <Fab.Button label="Add" />
   */
  label: string

  /**
   * The color to use as background for the button
   * @default highlightColor from Fab
   *
   * @example
   * <Fab.Button highlightColor="red" />
   */
  highlightColor?: string

  /**
   * Styles to apply to the button
   * @default undefined
   *
   * @example
   * <Fab.Button style={{ backgroundColor: 'red' }} />
   */
  style?: React.CSSProperties
}
