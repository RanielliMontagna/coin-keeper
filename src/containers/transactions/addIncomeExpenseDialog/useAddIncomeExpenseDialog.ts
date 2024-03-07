import { fetchCategories } from 'api/categories/categories'
import { fetchAccounts } from 'api/accounts/accounts'

import type { IAddIncomeExpenseDialogProps } from './addIncomeExpenseDialog'
import type { AddIncomeExpenseSchema } from './addIncomeExpenseDialog.schema'

import { useQuery } from 'hooks/useQuery'
import { queryClient } from 'libs/react-query'
import { useAppStore } from 'store/app/app'
import { useApiCall } from 'hooks/useApiCall'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'
import { createTransaction } from 'api/transactions/transactions'
import { createRecurringTransaction } from 'api/recurringTransactions/recurringTransactions'

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
    async function submit() {
      if (values.isRecurring) {
        await createRecurringTransaction({
          title: values.title,
          description: values.description,
          amount: Number(values.amount),
          accountId: values.account,
          categoryId: values.category,
          frequency: Number(values.frequency),
          repeatAmount: Number(values.repetition),
          startDate: values.date?.toISOString() ?? new Date().toISOString(),
          type: type,
        })
      } else {
        await createTransaction({
          title: values.title,
          description: values.description,
          amount: Number(values.amount),
          accountId: values.account,
          categoryId: values.category,
          isPaid: values.isPaid,
          date: values.date?.toISOString() ?? new Date().toISOString(),
          type: type,
        })
      }
    }

    call(submit, () => {
      queryClient.invalidateQueries('transactions')
      queryClient.invalidateQueries('accounts')
      queryClient.invalidateQueries('week')
      queryClient.invalidateQueries('month')
      queryClient.invalidateQueries('year')
      queryClient.invalidateQueries('transactionsBalance')
      queryClient.invalidateQueries('latestTransactions')

      addNotification({
        title: 'Success',
        message: `Transaction ${
          type === TransactionTypeEnum.INCOME ? 'income' : 'expense'
        } created successfully`,
      })
      onClose()
    })
  }

  return {
    categories:
      dataCategories?.categories?.map((category) => ({
        value: category.id,
        label: category.name,
        color: category.color,
      })) ?? [],
    accounts:
      dataAccounts?.accounts?.map((account) => ({
        value: account.id,
        label: account.name,
        institution: account.institution,
      })) ?? [],
    handleSubmit,
  }
}
