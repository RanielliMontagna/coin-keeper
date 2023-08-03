export enum InstitutionTypeEnum {
  OTHER = 0,
  NUBANK = 1,
  XP = 2,
  ITAU = 3,
  BRADESCO = 4,
  SANTANDER = 5,
  BANCO_DO_BRASIL = 6,
  CAIXA = 7,
  INTER = 8,
  SICOOB = 9,
  SICREDI = 10,
}

export interface CreateAccountPayload {
  name: string
  institution: InstitutionTypeEnum
  balance: number
}

export interface ResponseAccount {
  id: string
  name: string
  institution: InstitutionTypeEnum
  balance: number
}
