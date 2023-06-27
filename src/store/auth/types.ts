import type { LoginPayload, RegisterPayload } from 'api/auth/auth.types'

export enum UserType {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}
export interface UserTokenDecoded {
  sub: string
  type: UserType
}

export interface AuthState {
  token: string | null
  user: UserTokenDecoded | null
}

export interface AuthStore extends AuthState {
  login: (payload: LoginPayload) => void
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
  setToken: (token: string) => void
  setUser: (user: UserTokenDecoded | null) => void
  clearStore: () => void
  refreshToken: () => void
}
