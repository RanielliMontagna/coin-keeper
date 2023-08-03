import { InstitutionTypeEnum } from 'api/accounts/accounts.types'

export enum FlagEnum {
  OTHER = 0,
  VISA = 1,
  MASTERCARD = 2,
  ELO = 3,
  AMERICAN_EXPRESS = 4,
  DINERS_CLUB = 5,
  DISCOVER = 6,
  JCB = 7,
}

export interface CreateCreditCardPayload {
  name: string
  limit: number
  flag: FlagEnum
  closingDay: number
  dueDay: number
  accountId: string
}

export interface ResponseCreditCard extends Omit<CreateCreditCardPayload, 'accountId' | 'userId'> {
  id: string
  account: {
    id: string
    name: string
    institution: InstitutionTypeEnum
  }
}
