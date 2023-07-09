import type { CreateCreditCardPayload, ResponseCreditCard } from './creditCards.types'
import type { BackendResponse } from 'shared/types'

import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'
import { centsToReal } from 'utils/centsToReal'
import { realToCents } from 'utils/realToCents'

function treatCreditCard(creditCard: ResponseCreditCard) {
  return { ...creditCard, limit: centsToReal(creditCard.limit) }
}

export async function fetchCreditCards(): BackendResponse<{ creditCards: ResponseCreditCard[] }> {
  const response = await axiosInstance.get(urls.creditCards)
  const creditCards = response.data.creditCards.map(treatCreditCard)

  return { ...response, data: { creditCards } }
}

export async function getCreditCard(id: string) {
  const response = await axiosInstance.get(`${urls.creditCards}/${id}`)
  const creditCard = treatCreditCard(response.data)

  return { ...response, data: { creditCard } }
}

export async function createCreditCard(payload: CreateCreditCardPayload) {
  return await axiosInstance.post(urls.creditCards, {
    ...payload,
    limit: realToCents(payload.limit),
  })
}

export async function updateCreditCard(id: string, payload: Partial<CreateCreditCardPayload>) {
  return await axiosInstance.put(`${urls.creditCards}/${id}`, {
    ...payload,
    limit: payload.limit ? realToCents(payload.limit) : undefined,
  })
}

export async function deleteCreditCard(id: string) {
  return await axiosInstance.delete(`${urls.creditCards}/${id}`)
}
