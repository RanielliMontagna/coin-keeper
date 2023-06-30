import { useMediaQuery } from '@mantine/hooks'

import { MOBILE_BREAKPOINT } from 'shared/constants'

export function useIsMobile() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`)

  return {
    isMobile,
  }
}
