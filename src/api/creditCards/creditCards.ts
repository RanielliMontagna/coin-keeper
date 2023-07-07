import type { CreateCreditCardPayload, ResponseCreditCard } from './creditCards.types'
import type { BackendResponse } from 'shared/types'

import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'

export async function fetchCreditCards(): BackendResponse<{ creditCards: ResponseCreditCard[] }> {
  return await axiosInstance.get(urls.creditCards)
}

export async function getCreditCard(id: string) {
  return await axiosInstance.get(`${urls.creditCards}/${id}`)
}

export async function createCreditCard(payload: CreateCreditCardPayload) {
  return await axiosInstance.post(urls.creditCards, payload)
}

export async function updateCreditCard(id: string, payload: CreateCreditCardPayload) {
  return await axiosInstance.put(`${urls.creditCards}/${id}`, payload)
}

export async function deleteCreditCard(id: string) {
  return await axiosInstance.delete(`${urls.creditCards}/${id}`)
}
