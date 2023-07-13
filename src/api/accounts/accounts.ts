import type { CreateAccountPayload, ResponseAccount } from './accounts.types'
import type { BackendResponse } from 'shared/types'

import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'
import { Options } from 'shared/options'
import { centsToReal } from 'utils/centsToReal'
import { realToCents } from 'utils/realToCents'

function treatAccount(account: ResponseAccount) {
  return { ...account, balance: centsToReal(account.balance) }
}

export async function fetchAccounts(
  options?: Pick<Options, 'search'>,
): BackendResponse<{ accounts: ResponseAccount[] }> {
  const response = await axiosInstance.get(urls.accounts, { params: options })
  const accounts = response.data.accounts.map(treatAccount)

  return { ...response, data: { accounts } }
}

export async function getAccount(id: string) {
  const response = await axiosInstance.get(`${urls.accounts}/${id}`)
  const account = treatAccount(response.data)

  return { ...response, data: { account } }
}

export async function createAccount(payload: CreateAccountPayload) {
  return await axiosInstance.post(urls.accounts, {
    ...payload,
    balance: realToCents(payload.balance),
  })
}

export async function updateAccount(id: string, payload: Partial<CreateAccountPayload>) {
  return await axiosInstance.put(`${urls.accounts}/${id}`, {
    ...payload,
    balance: payload.balance ? realToCents(payload.balance) : 0,
  })
}

export async function deleteAccount(id: string) {
  return await axiosInstance.delete(`${urls.accounts}/${id}`)
}
