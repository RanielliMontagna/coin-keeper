import React, { useRef } from 'react'
import { useMantineTheme } from '@mantine/core'

import type { IFabContextProps } from './fab.types'

const FabContext = React.createContext({} as IFabContextProps)

export function FabProvider({
  children,
  highlightColor,
}: {
  children: React.ReactNode
  highlightColor?: string
}) {
  const { colors } = useMantineTheme()

  const [isOpen, setIsOpen] = React.useState(false)
  const fabStackRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleToggleIsOpen = () => {
    if (isOpen) {
      if (fabStackRef.current) {
        fabStackRef.current.style.transform = 'translateY(150%)'
        fabStackRef.current.style.opacity = '0'

        if (overlayRef.current) {
          overlayRef.current.style.opacity = '0'
        }
      }
      setTimeout(() => {
        setIsOpen((prevState) => !prevState)
      }, 300)
    } else {
      setIsOpen((prevState) => !prevState)
      setTimeout(() => {
        if (fabStackRef.current) {
          fabStackRef.current.style.transform = 'translateY(0%)'
          fabStackRef.current.style.opacity = '1'

          if (overlayRef.current) {
            overlayRef.current.style.opacity = '1'
          }
        }
      }, 10)
    }
  }

  return (
    <FabContext.Provider
      value={{
        isOpen,
        fabStackRef,
        overlayRef,
        highlightColor: highlightColor || colors.blue[6],
        handleToggleIsOpen,
      }}
    >
      {children}
    </FabContext.Provider>
  )
}

export function useFab() {
  const context = React.useContext(FabContext)

  if (!context) {
    throw new Error('useFab() must be used within a <FabProvider />')
  }

  return context
}
