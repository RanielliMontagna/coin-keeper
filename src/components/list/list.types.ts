import type { IActionProps } from 'components/datatable/actions/actions'

type Data = any

export interface IListContextProps {
  data: Data[]
  isLoading: boolean
}

export interface IListProviderProps {
  children: React.ReactNode
  data: Data[]
}

export interface IListRoot {
  children: React.ReactNode
  data: Data[]
}

export interface IListRowProps {
  children: (row: Data, index: number) => React.ReactNode
  actions?: IActionProps[]
}
