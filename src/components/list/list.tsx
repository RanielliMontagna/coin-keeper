import React from 'react'

import type { IListRoot, IListRowProps } from './list.types'
import { ListPaper } from './list.styles'
import { ListProvider } from './list.context'
import { ListRow } from './listRow/listRow'

function ListRoot({ children }: Pick<IListRoot, 'children'>) {
  const _childrenArray = React.Children.toArray(children)

  const _rows = _childrenArray.find(
    (child): child is React.ReactElement<IListRowProps> =>
      React.isValidElement(child) && child.type === ListRow,
  )

  return <ListPaper>{_rows}</ListPaper>
}

export function ListRootWrapper({ children, data }: IListRoot) {
  return (
    <ListProvider data={data}>
      <ListRoot>{children}</ListRoot>
    </ListProvider>
  )
}

ListRoot.displayName = 'List'

export { ListRootWrapper as ListRoot }
