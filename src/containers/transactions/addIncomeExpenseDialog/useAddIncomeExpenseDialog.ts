import { fetchCategories } from 'api/categories/categories'
import { fetchAccounts } from 'api/accounts/accounts'

import type { ResponseCategory } from 'api/categories/categories.types'
import type { ResponseAccount } from 'api/accounts/accounts.types'
import type { IAddIncomeExpenseDialogProps } from './addIncomeExpenseDialog'
import type { AddIncomeExpenseSchema } from './addIncomeExpenseDialog.schema'

import { useQuery } from 'hooks/useQuery'
import { queryClient } from 'libs/react-query'
import { useAppStore } from 'store/app/app'
import { useApiCall } from 'hooks/useApiCall'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'
import { createTransaction } from 'api/transactions/transactions'

export function useAddIncomeExpenseDialog({ type, onClose }: IAddIncomeExpenseDialogProps) {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetchCategories()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const { data: dataAccounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await fetchAccounts()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const handleSubmit = (values: AddIncomeExpenseSchema) => {
    call(
      () =>
        createTransaction({
          title: values.title,
          description: values.description,
          amount: Number(values.amount),
          accountId: values.account,
          categoryId: values.category,
          date: values.date?.toISOString() ?? new Date().toISOString(),
          type: type,
        }),
      () => {
        queryClient.invalidateQueries('transactions')
        queryClient.invalidateQueries('accounts')
        queryClient.invalidateQueries('week')
        queryClient.invalidateQueries('month')
        queryClient.invalidateQueries('year')
        addNotification({
          title: 'Success',
          message: `Transaction ${
            type === TransactionTypeEnum.INCOME ? 'income' : 'expense'
          } created successfully`,
        })
        onClose()
      },
    )
  }

  return {
    categories:
      dataCategories?.data?.categories?.map((category: ResponseCategory) => ({
        value: category.id,
        label: category.name,
        color: category.color,
      })) ?? [],
    accounts:
      dataAccounts?.data?.accounts?.map((account: ResponseAccount) => ({
        value: account.id,
        label: account.name,
        institution: account.institution,
      })) ?? [],
    handleSubmit,
  }
}
