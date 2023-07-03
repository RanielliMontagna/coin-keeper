import { Loader, Overlay } from '@mantine/core'

export function Loading() {
  return (
    <Overlay
      style={{
        zIndex: 1000,
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader size="xl" variant="bars" />
    </Overlay>
  )
}
