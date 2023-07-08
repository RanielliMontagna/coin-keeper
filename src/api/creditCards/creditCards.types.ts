import { InstitutionTypeEnum } from 'api/accounts/accounts.types'

export enum FlagEnum {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  ELO = 'ELO',
  AMERICAN_EXPRESS = 'AMERICAN_EXPRESS',
  DINERS_CLUB = 'DINERS_CLUB',
  DISCOVER = 'DISCOVER',
  JCB = 'JCB',
  OTHER = 'OTHER',
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
