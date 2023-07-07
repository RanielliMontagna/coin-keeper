import type { CreateCategoryPayload, ResponseCategory } from './categories.types'
import type { BackendResponse } from 'shared/types'

import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'
import { Options } from 'shared/options'

export async function fetchCategories(
  options?: Pick<Options, 'search'>,
): BackendResponse<{ categories: ResponseCategory[] }> {
  return await axiosInstance.get(urls.categories, { params: options })
}

export async function getCategory(id: string) {
  return await axiosInstance.get(`${urls.categories}/${id}`)
}

export async function createCategory(payload: CreateCategoryPayload) {
  return await axiosInstance.post(urls.categories, payload)
}

export async function updateCategory(id: string, payload: CreateCategoryPayload) {
  return await axiosInstance.put(`${urls.categories}/${id}`, payload)
}

export async function deleteCategory(id: string) {
  return await axiosInstance.delete(`${urls.categories}/${id}`)
}
