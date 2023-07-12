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

export interface IActionProps {
  label: string
  icon?: React.ReactNode
  onClick: (row: Data) => void
}

export interface IListRowProps {
  children: (row: Data, index: number) => React.ReactNode
  actions?: IActionProps[]
}
