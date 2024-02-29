export interface ICardProps {
  /**
   * Text to display in the card title
   */
  title: string

  /**
   * React node to display as card icon
   */
  icon?: React.ReactNode

  /**
   * The amount of money to display in the card
   */
  amount: number

  /**
   * If true, card will be displayed in loading state
   */
  isLoading?: boolean
}
