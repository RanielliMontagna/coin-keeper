export interface NavbarLinkProps {
  icon: React.FC<any>
  label: string
  active?: boolean
  onClick?(): void
}
