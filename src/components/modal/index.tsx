import { Modal as ModalMantine, ModalProps, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useIsMobile } from 'hooks/useIsMobile'
import { useEffect } from 'react'

export interface IModalProps extends Omit<ModalProps, 'opened'> {}

export function Modal(props: IModalProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const { isMobile } = useIsMobile()

  useEffect(() => {
    open()
  }, [])

  function handleClose() {
    close()

    setTimeout(() => props.onClose(), 300)
  }

  return (
    <ModalMantine
      opened={opened}
      fullScreen={isMobile}
      centered
      closeOnClickOutside={false}
      {...props}
      onClose={handleClose}
      styles={{ content: { borderRadius: rem(8) } }}
      title={<strong>{props.title}</strong>}
    />
  )
}
