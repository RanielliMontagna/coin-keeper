import React from 'react'
import type { IListContextProps, IListProviderProps } from './list.types'

const ListContext = React.createContext({} as IListContextProps)

export function ListProvider({ children, data }: IListProviderProps) {
  return (
    <ListContext.Provider value={{ data: data } as IListContextProps}>
      {children}
    </ListContext.Provider>
  )
}

export function useList() {
  const context = React.useContext(ListContext)

  if (!context) {
    throw new Error('useList() must be used within a <ListProvider />')
  }

  return context
}
