import type { IAddTransactionDialogProps } from './addTransactionDialog'
import type { AddTransactionSchema } from './addTransactionDialog.schema'

import { useQuery } from 'hooks/useQuery'
import { useApiCall } from 'hooks/useApiCall'
import { queryClient } from 'libs/react-query'
import { useAppStore } from 'store/app/app'

import { AddTransactionTypeEnum } from 'contexts/transactions/transactions.context.types'

import { createRecurringTransaction } from 'api/recurringTransactions/recurringTransactions'
import { createTransaction } from 'api/transactions/transactions'
import { fetchCategories } from 'api/categories/categories'
import { fetchAccounts } from 'api/accounts/accounts'
import { fetchCreditCards } from 'api/creditCards/creditCards'

export function useAddTransactionDialog({ type, onClose }: IAddTransactionDialogProps) {
  const { addNotification } = useAppStore()
  const { call } = useApiCall()

  const { data: dataCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('fetching categories')

      const res = await fetchCategories()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const { data: dataAccounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      console.log('fetching accounts')

      if (type === AddTransactionTypeEnum.CREDIT) {
        return null
      }

      const res = await fetchAccounts()
      return res.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: type === AddTransactionTypeEnum.CREDIT ? 0 : 1000 * 60 * 5,
  })

  const { data: creditCards } = useQuery({
    queryKey: ['creditCards'],
    queryFn: async () => {
      console.log('fetching credit cards')

      if (type === AddTransactionTypeEnum.CREDIT) {
        const res = await fetchCreditCards()
        return res.data
      }
      return null
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: type === AddTransactionTypeEnum.CREDIT ? 1000 * 60 * 5 : 0,
  })

  const handleSubmit = (values: AddTransactionSchema) => {
    async function submit() {
      if (type === AddTransactionTypeEnum.CREDIT) {
        //TODO: create credit transaction here
      } else {
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
    }

    call(submit, () => {
      queryClient.invalidateQueries('transactions')
      queryClient.invalidateQueries('accounts')
      queryClient.invalidateQueries('week')
      queryClient.invalidateQueries('month')
      queryClient.invalidateQueries('year')
      queryClient.invalidateQueries('transactionsBalance')
      queryClient.invalidateQueries('latestTransactions')

      const message = () => {
        switch (type) {
          case AddTransactionTypeEnum.INCOME:
            return 'income'
          case AddTransactionTypeEnum.EXPENSE:
            return 'expense'
          case AddTransactionTypeEnum.CREDIT:
            return 'credit expense'
        }
      }

      addNotification({
        title: 'Success',
        message: `New ${message()} added successfully`,
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
    creditCards:
      creditCards?.creditCards?.map((creditCard) => ({
        value: creditCard.id,
        label: creditCard.name,
        flag: creditCard.flag,
      })) ?? [],
    handleSubmit,
  }
}
