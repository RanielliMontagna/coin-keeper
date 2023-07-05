export enum InstitutionTypeEnum {
  NUBANK = 'NUBANK',
  XP = 'XP',
  ITAU = 'ITAU',
  BRADESCO = 'BRADESCO',
  SANTANDER = 'SANTANDER',
  BANCO_DO_BRASIL = 'BANCO_DO_BRASIL',
  CAIXA = 'CAIXA',
  INTER = 'INTER',
  SICOOB = 'SICOOB',
  SICREDI = 'SICREDI',
  OTHER = 'OTHER',
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
