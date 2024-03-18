import { urls } from 'api/urls'
import { axiosInstance } from 'libs/axios'
import { BackendResponse } from 'shared/types'

import type { CreateInvoiceExpensePayload, CreateInvoiceExpenseResponse } from './invoices.types'

export function createInvoiceExpense({
  creditCardId,
  ...rest
}: CreateInvoiceExpensePayload): BackendResponse<CreateInvoiceExpenseResponse> {
  return axiosInstance.post(`${urls.creditCards}/${creditCardId}/invoice/expense`, rest)
}
