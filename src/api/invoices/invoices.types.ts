export interface CreateInvoiceExpensePayload {
  title: string
  description?: string
  amount: number // in cents
  date: string

  categoryId: string
  creditCardId: string
}

export interface CreateInvoiceExpenseResponse {
  invoiceExpense: {
    id: string
    title: string
    description: string
    amount: number
    date: string
    userId: string
    invoiceId: string
    category_id: string
  }
}
