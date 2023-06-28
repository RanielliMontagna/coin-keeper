import { Group } from '@mantine/core'
import { Quotation, QuotationType } from './quotation/quotation'

export function Quotes() {
  return (
    <Group>
      <Quotation type={QuotationType.DOLAR} amount={4.85} />
      <Quotation type={QuotationType.EURO} amount={5.75} />
      <Quotation type={QuotationType.BITCOIN} amount={250000} />
      <Quotation type={QuotationType.IBOVESPA} amount={120000} />
    </Group>
  )
}
