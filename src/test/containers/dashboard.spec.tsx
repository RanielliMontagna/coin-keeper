import Dashboard from 'containers/dashboard'
import { renderWithProviders } from 'test/helpers'

import { useIsMobile } from 'hooks/useIsMobile'
import { useTransactions } from 'containers/dashboard/transactions/useTransactions'

import { InstitutionTypeEnum } from 'api/accounts/accounts.types'
import { CategoryColorsEnum } from 'api/categories/categories.types'
import { TransactionTypeEnum } from 'api/transactions/transactions.types'

vi.mock('hooks/useIsMobile')
vi.mock('containers/dashboard/transactions/useTransactions')

const transactionBase = {
  id: 'test-id',
  title: 'teste',
  amount: 500000,
  category: { name: 'teste', color: CategoryColorsEnum.AMBER, id: 'test-id' },
  account: {
    name: 'teste',
    id: 'test-id',
    institution: InstitutionTypeEnum.BANCO_DO_BRASIL,
  },
  isPaid: true,
  description: 'teste',
  type: TransactionTypeEnum.INCOME,
  date: '2021-08-20T00:00:00.000Z',
}

describe('@containers/dashboard', () => {
  beforeEach(() => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: false })
    vi.mocked(useTransactions).mockReturnValue({
      transactions: [],
      isLoading: true,
    })
  })

  it('should render the Dashboard container', () => {
    const { container } = renderWithProviders(<Dashboard />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Dashboard container on mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue({ isMobile: true })

    const { container } = renderWithProviders(<Dashboard />)
    expect(container).toBeInTheDocument()
  })

  it('should render the Dashboard container with transactions', () => {
    vi.mocked(useTransactions).mockReturnValue({
      transactions: [
        { ...transactionBase, id: 'test-id-1', type: TransactionTypeEnum.INCOME },
        { ...transactionBase, id: 'test-id-2', type: TransactionTypeEnum.EXPENSE },
      ],
      isLoading: false,
    })

    const { container } = renderWithProviders(<Dashboard />)
    expect(container).toBeInTheDocument()
  })

  it('should render empty state of transactions on Dashboard container', () => {
    vi.mocked(useTransactions).mockReturnValue({ transactions: [], isLoading: false })

    const { container } = renderWithProviders(<Dashboard />)
    expect(container).toBeInTheDocument()
  })
})
