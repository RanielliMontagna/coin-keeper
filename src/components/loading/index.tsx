import { Loader, Overlay } from '@mantine/core'

export function Loading() {
  return (
    <Overlay
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader size="xl" variant="bars" />
    </Overlay>
  )
}
