import { Group } from '@mantine/core'
import { Quotation, QuotationType } from './quotation/quotation'
import { useQuotes } from './useQuotes'

export function Quotes() {
  const { quotesData, quoteIsloading } = useQuotes()

  return (
    <Group>
      <Quotation
        type={QuotationType.DOLAR}
        amount={quotesData?.dollar?.price || 0}
        variation={quotesData?.dollar?.variation || 0}
        isLoading={quoteIsloading}
      />
      <Quotation
        type={QuotationType.EURO}
        amount={quotesData?.euro?.price || 0}
        variation={quotesData?.euro?.variation || 0}
        isLoading={quoteIsloading}
      />
      <Quotation
        type={QuotationType.BITCOIN}
        amount={quotesData?.bitcoin?.price || 0}
        variation={quotesData?.bitcoin?.variation || 0}
        isLoading={quoteIsloading}
      />
      <Quotation
        type={QuotationType.IBOVESPA}
        amount={quotesData?.ibovespa?.price || 0}
        variation={quotesData?.ibovespa?.variation || 0}
        isLoading={quoteIsloading}
      />
    </Group>
  )
}
