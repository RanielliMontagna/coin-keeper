import React, { FC, PropsWithChildren } from 'react'
import { SHeader } from './styles'

import { Title } from './title/title'
import { RightSection } from './rightSection/rightSection'
import { Subtitle } from './subtitle/subtitle'

interface IHeaderProps extends PropsWithChildren {}

const HeaderWithoutMemo: FC<IHeaderProps> = ({ children }) => {
  const _childrenArray = React.Children.toArray(children)

  const _title = _childrenArray.find((child) => (child as any).type === Title)
  const _subtitle = _childrenArray.find((child) => (child as any).type === Subtitle)
  const _rightSection = _childrenArray.find((child) => (child as any).type === RightSection)

  return (
    <SHeader>
      <div>
        {_title}
        {_subtitle}
      </div>
      {_rightSection}
    </SHeader>
  )
}

const Header = React.memo(HeaderWithoutMemo) as React.NamedExoticComponent<IHeaderProps> & {
  Title: React.ComponentType<React.ComponentProps<typeof Title>>
  Subtitle: React.ComponentType<React.ComponentProps<typeof Subtitle>>
  RightSection: React.ComponentType<React.ComponentProps<typeof RightSection>>
}

Header.Title = Title
Header.Subtitle = Subtitle
Header.RightSection = RightSection

export { Header }
